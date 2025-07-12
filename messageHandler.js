// messageHandler.js
const fs = require('fs');
const path = require('path');

const COMMAND_PREFIX = '!';

const commands = {};

// Cache for syncHistory to prevent repeated calls for the same chat
const syncedChats = new Set(); // Stores chat.id._serialized

function loadCommands() {
    const commandsPath = path.join(__dirname, 'commands');
    if (!fs.existsSync(commandsPath)) {
        console.warn(`Warning: 'commands' directory not found at ${commandsPath}. No commands will be loaded.`);
        return;
    }
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const command = require(path.join(commandsPath, file));
            if (command.name && command.execute) {
                commands[command.name] = command;
            } else {
                console.warn(`Warning: Command file ${file} does not export 'name' or 'execute' properties. Skipping.`);
            }
        } catch (error) {
            console.error(`Error loading command file ${file}:`, error);
        }
    }
    console.log(`Successfully loaded ${Object.keys(commands).length} commands.`);
}

loadCommands();

async function processIncomingMessage(client, message) {
    let messageText = '';
    if (message.type === 'chat' && typeof message.body === 'string') {
        messageText = message.body.trim();
    } else if (message.hasMedia && typeof message.caption === 'string') {
        messageText = message.caption.trim();
    }

    const fromMeIndicator = message.fromMe ? ' [FROM ME]' : '';
    if (messageText) {
        console.log(`[INCOMING] From: ${message.from} [Type: ${message.type}]${fromMeIndicator}: "${messageText}"`);
    } else {
        console.log(`[INCOMING] From: ${message.from} [Type: ${message.type}]${fromMeIndicator}: [Non-text message]`);
    }

    let chat;
    try {
        chat = await message.getChat();
        
        // --- NEW: AUTO_READ (controls chat.sendSeen()) ---
        if (process.env.AUTO_READ !== 'false') { // Default to true if not explicitly 'false'
            if (chat) {
                await chat.sendSeen();
            }
        }
    } catch (error) {
        console.error(`Error getting chat or marking message from ${message.from} as seen:`, error);
    }

    // --- Automatic History Sync controlled by ENV (as before) ---
    const enableAutoHistorySync = process.env.ENABLE_AUTO_HISTORY_SYNC === 'true';
    if (enableAutoHistorySync && chat && !syncedChats.has(chat.id._serialized)) {
        try {
            console.log(`Attempting to sync history for chat: ${chat.name || chat.id._serialized}`);
            const isSynced = await chat.syncHistory();
            if (isSynced) {
                syncedChats.add(chat.id._serialized);
                console.log(`History synced for chat: ${chat.name || chat.id._serialized}`);
            } else {
                console.log(`No new history to sync or already synced for chat: ${chat.name || chat.id._serialized}`);
            }
        } catch (error) {
            console.error(`Error syncing history for chat ${chat.id._serialized}:`, error);
        }
    }

    if (messageText.startsWith(COMMAND_PREFIX)) {
        const args = messageText.slice(COMMAND_PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (commands[commandName]) {
            const command = commands[commandName];

            if (command.groupOnly && !message.isGroup) {
                await client.sendMessage(message.from, 'This command can only be used in a group chat.');
                console.log(`Rejected group-only command "${commandName}" from non-group chat ${message.from}.`);
                return;
            }

            // --- Typing/Recording State controlled by ENV (as before) ---
            const botProcessState = process.env.PROCESS_BOT_STATE;
            if (chat) {
                if (botProcessState === 'typing') {
                    await chat.sendStateTyping();
                } else if (botProcessState === 'recording') {
                    await chat.sendStateRecording();
                }
            }

            try {
                await command.execute(client, message, args, commands);
                console.log(`Executed command "${commandName}" for ${message.from}.`);

                // --- Message Reaction on Success controlled by ENV (as before) ---
                if (process.env.REACT_ON_SUCCESS === 'true') {
                    await message.react('👍');
                }

            } catch (error) {
                console.error(`Error executing command "${commandName}" for ${message.from}:`, error);
                await client.sendMessage(message.from, `An error occurred while executing the command: ${commandName}.`);
            } finally {
                // Clear state after command execution (important!)
                if (chat && botProcessState) {
                    await chat.clearState();
                }
            }
        } else {
            await client.sendMessage(message.from, `Unknown command: ${COMMAND_PREFIX}${commandName}. Type ${COMMAND_PREFIX}menu for a list of commands.`);
            console.log(`Replied "Unknown command" to ${message.from} for "${messageText}".`);
        }
    } else {
        return;
    }
}

module.exports = {
    processIncomingMessage,
    commands,
    COMMAND_PREFIX
};