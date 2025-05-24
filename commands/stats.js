module.exports = {
    name: 'stats',
    description: 'Shows group statistics',
    async execute(message, args, client) {
        if (!message.isGroupMsg) {
            return message.reply('This command only works in groups!');
        }

        const chat = await message.getChat();
        const participants = chat.participants;
        const admins = participants.filter(p => p.isAdmin || p.isSuperAdmin);

        const statsText = `
📊 *Group Statistics*

👥 *Participants*: ${participants.length}
👑 *Admins*: ${admins.length}
📅 *Created*: ${chat.createdAt.toLocaleDateString()}
📝 *Description*: ${chat.description || 'No description'}
        `.trim();

        message.reply(statsText);
    }
};