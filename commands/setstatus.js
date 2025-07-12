// commands/setstatus.js
module.exports = {
    name: 'setstatus',
    description: 'Sets the bot\'s WhatsApp status message. Usage: !setstatus <your new status>',
    category: 'Bot Admin',
    groupOnly: false,
    async execute(client, message, args, commands) {
        const newStatus = args.join(' ');
        if (!newStatus) {
            return await message.reply('Please provide a new status message. Usage: !setstatus <your new status>');
        }

        try {
            await client.setStatus(newStatus);
            await message.reply(`Bot status was updated to: *${newStatus}*`);
        } catch (error) {
            console.error('Error setting status:', error);
            await message.reply('Failed to set status. This might be a temporary WhatsApp issue or permission related.');
        }
    }
};