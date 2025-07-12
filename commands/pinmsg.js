// commands/pinmsg.js
module.exports = {
    name: 'pinmsg',
    description: 'Pins a quoted message in the group for a specified duration (default: 24h). Reply to a message with this command. Usage: !pinmsg [duration_seconds (86400, 604800, 2592000)]',
    category: 'Group Admin',
    groupOnly: true, // Message pinning is group-specific
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a message you wish to pin. Usage: !pinmsg [duration_seconds] (reply to message)');
        }

        const chat = await message.getChat();
        if (!chat.isGroup) {
            return await message.reply('Message pinning is only available in group chats.');
        }

        const quotedMsg = await message.getQuotedMessage();
        let duration = 86400; // Default to 24 hours (86400 seconds)

        if (args.length > 0) {
            const parsedDuration = parseInt(args[0], 10);
            if (!isNaN(parsedDuration) && parsedDuration > 0) {
                duration = parsedDuration;
            } else {
                return await message.reply('Invalid duration. Please provide a positive number of seconds. Defaulting to 24 hours. Valid values: 86400 (24h), 604800 (7d), 2592000 (30d).');
            }
        }

        try {
            const result = await quotedMsg.pin(duration);
            if (result) {
                await message.reply(`Message pinned successfully for ${duration} seconds.`);
            } else {
                await message.reply('Failed to pin message. It might already be pinned, or I lack admin permissions.');
            }
            console.log('Pin message result:', result);
        } catch (error) {
            console.error('Error pinning message:', error);
            await message.reply('Failed to pin message. Make sure I have admin permissions and the message is eligible.');
        }
    }
};