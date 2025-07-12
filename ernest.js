// index.js (This is your main bot file)
const { Client, LocalAuth } = require("whatsapp-web.js");
const path = require('path');
const fs = require('fs');
// const readlineSync = require('readline-sync'); // REMOVED: Not suitable for cloud environments
require('dotenv').config(); // Load environment variables from .env

// --- NEW IMPORT FOR EXPRESS SERVER ---
const express = require('express'); // Import express

// Import messageHandler, which handles command loading and processing
const messageHandler = require('./messageHandler');
const COMMAND_PREFIX = messageHandler.COMMAND_PREFIX; // Extract prefix once

// --- NEW IMPORT: autostatusview ---
const { handleStatusUpdate } = require('./autostatusview');

// Re-importing logging utilities (ensure these are installed: npm install chalk boxen qrcode-terminal)
const qrcode = require("qrcode-terminal");
const chalk = require("chalk");
const boxen = require("boxen").default; // Ensure .default is used for boxen

// Define session details
const SESSION_NAME = 'my-bot-session';
const SESSION_DATA_PATH = path.join(__dirname, '.wwebjs_auth');

// 🎨 Stylish logger function with boxes
const log = (type, msg) => {
    const colors = {
        info: { color: chalk.blue, label: "[INFO]", border: "blue" },
        error: { color: chalk.red, label: "[ERROR]", border: "red" },
        ready: { color: chalk.green, label: "[READY]", border: "green" },
        warn: { color: chalk.yellow, label: "[WARN]", border: "yellow" },
        event: { color: chalk.magenta, label: "[EVENT]", border: "magenta" },
        debug: { color: chalk.cyan, label: "[DEBUG]", border: "cyan" }
    };

    const style = colors[type.toLowerCase()] || { color: chalk.white, label: "[LOG]", border: "white" };

    // Format timestamp for consistent output
    const stamp = `[${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]`;

    const boxOptions = {
        padding: 1,
        margin: 1,
        borderStyle: type === 'ready' ? 'double' : 'round',
        borderColor: style.border,
        backgroundColor: '#1a1a1a'
    };

    const content = `${stamp} ${style.color(style.label)} ${msg}`;
    console.log(boxen(content, boxOptions));
};

// 🎉 Fancy startup logs
const showStartupBanner = () => {
    const banner = chalk.bold.hex('#FFA500')(
      `╔══════════════════════════════╗
      ║             E R N E S T   B O T   v1.0.0     ║
      ╚══════════════════════════════╝`
    );

    const box = boxen(banner, {
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'yellow',
      backgroundColor: '#1a1a1a'
    });

    console.log(box);
    log("event", "Initializing Ernest...");
    log("debug", "Checking system dependencies...");
    log("info", "Loading command modules...");
};

// ⚙️ WhatsApp Client Setup
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: SESSION_NAME,
        dataPath: SESSION_DATA_PATH,
    }),
    puppeteer: {
        headless: 'new', // Use 'new' for new headless mode
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            '--disable-dev-shm-usage',
            '--disable-accelerated-video-decode',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-features=site-per-process',
            '--disable-client-side-phishing-detection',
            '--disable-background-networking',
            '--disable-sync',
            '--disable-extensions',
            '--disable-component-update',
            '--enable-features=NetworkService,NetworkServiceInProcess',
            '--window-size=1920,1080',
            '--incognito'
        ],
        handleSIGINT: false // We'll handle SIGINT ourselves for graceful shutdown
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
    }
});


// 🧠 Main Event Handlers
const setupEventHandlers = () => {
    client.on("qr", (qr) => {
        log("info", "QR event received (internal signal, not displaying full QR code for scan).");
    });

    client.on("ready", async () => {
        log("ready", chalk.bold.green("🚀 ERNEST IS NOW OPERATIONAL!"));
        log("info", "📊 All systems green. Awaiting commands...");
        log("debug", `📦 Loaded ${Object.keys(messageHandler.commands).length} commands`);

        try {
            const info = await client.info;
            log("info", `Connected as: ${info.pushname} (${info.wid.user})`);
        } catch (error) {
            log("error", `Failed to get client info: ${error.message}`);
        }
    });

    client.on("authenticated", () => {
        log("event", "🔓 Authentication successful! Session should now be saved.");
    });

    client.on("auth_failure", msg => {
        log("error", `🔐 Authentication failed: ${msg}`);
        client.destroy();
        setTimeout(() => startErnest(), 5000); 
    });

    client.on("disconnected", (reason) => {
        log("warn", `⚠️ Disconnected: ${reason}`);
        log("info", "♻️ Attempting to reconnect...");
        client.destroy(); 
        setTimeout(() => startErnest(), 5000); 
    });

    client.on('loading_screen', (percent, message) => {
        log("info", `LOADING SCREEN ${percent}%: ${message}`);
    });

    // --- Message Event Handler ---
    client.on("message_create", async (msg) => {
        if (msg.fromMe && !msg.body.startsWith(COMMAND_PREFIX)) {
            return; 
        }

        if (msg.isStatus) {
            await handleStatusUpdate(client, msg); 
        } else {
            messageHandler.processIncomingMessage(client, msg);
        }
    });

    client.on("group_join", async (notification) => {
        log("event", `👋 New member joined: ${notification.author}`);
        try {
            const chatId = notification.chatId;
            const userId = notification.author;
            const welcomeCmd = messageHandler.commands['welcome']; 
            if (welcomeCmd && welcomeCmd.execute) {
                await welcomeCmd.execute(client, { 
                    id: { _serialized: `welcome-message-${Date.now()}` }, 
                    from: chatId, 
                    author: userId, 
                    isGroup: true, 
                    body: '' 
                }, [], messageHandler.commands); 
            } else {
                log("warn", "Welcome command not found or does not have an execute method in messageHandler.");
            }
        } catch (error) {
            log("error", `❌ Welcome message failed: ${error.message}`);
        }
    });

    client.on("group_leave", async (notification) => {
        log("event", `👋 Member left: ${notification.author}`);
    });
};

const startStatusMonitor = () => {
    // (Block intentionally empty, or contains other scheduled tasks)
};

// 🧠 Main initialization function
async function startErnest() { 
    showStartupBanner();

    const app = express();
    const PORT = process.env.PORT || 3000; 

    app.get('/', (req, res) => {
        res.status(200).send('Ernest Bot is running and healthy!');
    });

    app.listen(PORT, () => {
        log("info", `🌐 Express server listening on port ${PORT} for health checks.`);
    }).on('error', (err) => {
        log("error", `❌ Express server failed to start on port ${PORT}: ${err.message}`);
        process.exit(1); 
    });

    setupEventHandlers(); 
    startStatusMonitor(); 

    log("info", "⚡ Initializing WhatsApp client...");

    let phoneNumber = process.env.PHONE_NUMBER;
    if (!phoneNumber) {
        log("error", "PHONE_NUMBER environment variable is not set. This is required for cloud deployments.");
        log("error", "Please set PHONE_NUMBER in your Render environment variables (e.g., 254712345678, no '+' or spaces).");
        process.exit(1); 
    }

    const cleanPhoneNumber = phoneNumber.replace(/\D/g, ''); 
    if (cleanPhoneNumber.length < 9) { 
        log("error", "Invalid PHONE_NUMBER format. Please ensure it's a full international number (e.g., 254712345678) without '+' or spaces. Exiting.");
        process.exit(1);
    }

    const hasExistingSession = fs.existsSync(path.join(SESSION_DATA_PATH, `session-${SESSION_NAME}`));

    if (!hasExistingSession) {
        log("info", `No existing session found at "${SESSION_DATA_PATH}". Attempting to authenticate via pairing code...`);
        try {
            // --- ADDED DEBUG LOGS HERE ---
            log("debug", "Starting client.initialize() for first-time authentication. This may take a moment...");
            await client.initialize();
            log("debug", "client.initialize() completed. Requesting pairing code...");
            const pairingCode = await client.requestPairingCode(cleanPhoneNumber);
            log("debug", "Pairing code received. Displaying in logs now.");

            // --- Make pairing code highly visible in Render logs ---
            console.log(`\n\n======================================================`);
            console.log(chalk.bold.hex('#FFD700')(`                     🔥 PAIRING CODE GENERATED 🔥`));
            console.log(chalk.bold.greenBright(`                             ${pairingCode}`)); // Highlight the code itself
            console.log(chalk.bold.hex('#FFD700')(`======================================================`));
            console.log(`\n**ACTION REQUIRED ON YOUR PHONE:**`);
            console.log(`1. Open WhatsApp.`);
            console.log(`2. Go to Settings / More options (three dots) -> Linked Devices.`);
            console.log(`3. Tap "Link a Device".`);
            console.log(`4. Tap "Link with phone number" (usually at the bottom).`);
            console.log(`5. Enter the 8-character code: ${pairingCode}`);
            console.log(`\n(This bot process will remain running and wait for you to link. Once linked, the session will be saved automatically.)`);

        } catch (error) {
            // --- ADDED DETAILED ERROR LOGGING HERE ---
            log("error", "ERROR during WhatsApp client initialization or pairing code request:");
            log("error", `Message: ${error.message}`);
            log("error", `Name: ${error.name}`); // Often gives more specific error type
            log("error", `Stack: \n${error.stack}`); // Print full stack trace for debugging
            log("error", "This might indicate an issue with Puppeteer (Chromium) launch, missing system dependencies, or resource constraints.");
            log("error", "Please ensure your PHONE_NUMBER environment variable is correct and your phone is online with an active WhatsApp connection. Exiting for restart.");
            process.exit(1); 
        }
    } else {
        log("info", `Existing session found at "${SESSION_DATA_PATH}". Attempting to restore session...`);
        try {
            // --- ADDED DEBUG LOGS HERE ---
            log("debug", "Starting client.initialize() for session restoration. This may take a moment...");
            await client.initialize();
            log("debug", "Session restoration completed successfully.");
        } catch (err) {
            // --- ADDED DETAILED ERROR LOGGING HERE ---
            log("error", "ERROR during WhatsApp client session restoration:");
            log("error", `Message: ${err.message}`);
            log("error", `Name: ${err.name}`);
            log("error", `Stack: \n${err.stack}`); // Print full stack trace
            log("error", "Session might be corrupted or outdated, or Puppeteer failed to launch. Please try deleting the session folder on Render (if possible via shell) or locally, then redeploy.");
            process.exit(1); 
        }
    }

    process.on('SIGINT', async () => {
        log("info", '\n(SIGINT) Received. Attempting graceful shutdown...');
        if (client && typeof client.destroy === 'function') {
            try {
                log("info", 'Destroying client to save session...');
                await client.destroy();
                log("info", 'Client destroyed. Session saved (if applicable).');
            } catch (err) {
                log("error", 'Error destroying client: ' + err.message);
            }
        } else {
            log("warn", 'Client not initialized or already destroyed.');
        }
        process.exit(0); 
    });
}

module.exports = {
    startErnest, 
    client, 
    commandMap: messageHandler.commands, 
    COMMAND_PREFIX: COMMAND_PREFIX 
};

