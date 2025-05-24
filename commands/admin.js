module.exports = {
    name: 'admin',
    description: 'Admin-only commands',
    async execute(message, args, client) {
        const adminNumber = process.env.ADMIN_NUMBER;
        if (message.from !== `${adminNumber}@c.us`) {
            return message.reply('This command is only available for the admin!');
        }

        const subCommand = args[0];
        if (!subCommand) {
            return message.reply('Please specify a subcommand: broadcast, eval, etc.');
        }

        switch (subCommand.toLowerCase()) {
            case 'broadcast':
                const broadcastMessage = args.slice(1).join(' ');
                if (!broadcastMessage) {
                    return message.reply('Please provide a message to broadcast!');
                }

                const chats = await client.getChats();
                for (const chat of chats) {
                    try {
                        await client.sendMessage(chat.id._serialized, 
                            `📢 *Admin Broadcast* 📢\n\n${broadcastMessage}`
                        );
                    } catch (error) {
                        console.error(`Failed to broadcast to ${chat.name || chat.id}:`, error);
                    }
                }
                return message.reply(`Broadcast sent to ${chats.length} chats!`);

            case 'eval':
                if (args.length < 2) {
                    return message.reply('Please provide code to evaluate!');
                }
                try {
                    const code = args.slice(1).join(' ');
                    // eslint-disable-next-line no-eval
                    const result = eval(code);
                    return message.reply(`Evaluation result:\n\`\`\`${JSON.stringify(result, null, 2)}\`\`\``);
                } catch (error) {
                    return message.reply(`Evaluation error:\n\`\`\`${error}\`\`\``);
                }

            default:
                return message.reply('Unknown subcommand! Available: broadcast, eval');
        }
    }
};