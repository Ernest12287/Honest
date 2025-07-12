// commands/admin.js
module.exports = {
    name: 'admin',
    description: 'Provides admin-only functionalities like broadcasting or evaluating code. Use with caution!',
    category: 'Admin', // Clearly an Admin command
    groupOnly: false, // Can be used in DMs by the admin
    
    // Corrected execute function signature to (client, message, args, commands)
    async execute(client, message, args, commands) {
        // Ensure ADMIN_NUMBER is set in your .env or similar config
        const adminNumber = process.env.ADMIN_NUMBER; 
        
        // This check ensures only the designated admin can use the command
        if (!adminNumber || message.from !== `${adminNumber}@c.us`) {
            return await message.reply('This command is only available for the bot administrator!');
        }

        const subCommand = args[0]; // The first argument is the subcommand
        if (!subCommand) {
            return await message.reply('Please specify an admin subcommand: `broadcast`, `eval`');
        }

        switch (subCommand.toLowerCase()) {
            case 'broadcast':
                const broadcastMessage = args.slice(1).join(' ');
                if (!broadcastMessage) {
                    return await message.reply('Please provide a message to broadcast!');
                }

                const chats = await client.getChats();
                let successCount = 0;
                for (const chat of chats) {
                    try {
                        // Ensure chat.id._serialized is used for sendMessage
                        await client.sendMessage(chat.id._serialized, 
                            `📢 *Admin Broadcast* 📢\n\n${broadcastMessage}`
                        );
                        successCount++;
                    } catch (error) {
                        console.error(`Failed to broadcast to ${chat.name || chat.id._serialized || chat.id}:`, error);
                    }
                }
                return await message.reply(`Broadcast sent to ${successCount} out of ${chats.length} chats!`);

            case 'eval':
                if (args.length < 2) {
                    return await message.reply('Please provide code to evaluate!');
                }
                try {
                    const code = args.slice(1).join(' ');
                    // eslint-disable-next-line no-eval
                    const result = eval(code); // Consider safer alternatives to eval in production
                    return await message.reply(`Evaluation result:\n\`\`\`json\n${JSON.stringify(result, null, 2)}\n\`\`\``);
                } catch (error) {
                    return await message.reply(`Evaluation error:\n\`\`\`${error.message || error}\`\`\``);
                }

            default:
                return await message.reply('Unknown admin subcommand! Available: `broadcast`, `eval`');
        }
    }
};