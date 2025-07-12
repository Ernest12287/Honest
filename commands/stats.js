// commands/stats.js
const chalk = require('chalk'); // Assuming chalk is used here for logging

module.exports = {
    name: 'stats',
    description: 'Shows group statistics (participants, admins, creation date, description).',
    category: 'Group', // Assuming this is a group management command
    groupOnly: true, // This command explicitly checks for group messages
    
    // Corrected execute function signature: (client, message, args, commands)
    async execute(client, message, args, commands) {
        if (!message.isGroup) { // Use message.isGroup as per whatsapp-web.js Message object
            return await message.reply('This command only works in groups!');
        }

        try {
            const chat = await message.getChat();
            const participants = chat.participants;
            const admins = participants.filter(p => p.isAdmin || p.isSuperAdmin);

            // Ensure chat.createdAt is a Date object before calling toLocaleDateString
            const createdAtDate = chat.createdAt ? new Date(chat.createdAt * 1000) : null; // Convert Unix timestamp to Date
            const formattedDate = createdAtDate ? createdAtDate.toLocaleDateString() : 'Unknown';

            const statsText = `
📊 *Group Statistics*

👥 *Participants*: ${participants.length}
👑 *Admins*: ${admins.length}
📅 *Created*: ${formattedDate}
📝 *Description*: ${chat.description || 'No description'}
            `.trim();

            await message.reply(statsText);
            console.log(chalk.green(`[STATS] Sent stats for group ${chat.name} to ${message.from}`));
        } catch (error) {
            console.error(chalk.red(`[STATS ERROR] ${error.message}`));
            await message.reply("Failed to retrieve group statistics.");
        }
    }
};