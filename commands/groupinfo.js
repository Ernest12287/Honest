// commands/groupinfo.js
module.exports = {
    name: 'groupinfo',
    description: 'Displays detailed information about the current group.',
    category: 'Group',
    groupOnly: true, // Only applicable in groups
    async execute(client, message, args, commands) {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return await message.reply('This command can only be used in a group!');
        }

        try {
            await message.reply(`
*Group Details*
Name: ${chat.name}
Description: ${chat.description || 'No description set'}
Created At: ${chat.createdAt ? new Date(chat.createdAt * 1000).toLocaleString() : 'N/A'}
Created By: ${chat.owner ? chat.owner.user.split('@')[0] : 'N/A'}
Participant count: ${chat.participants.length}
            `.trim());
        } catch (error) {
            console.error('Error getting group info:', error);
            await message.reply('Failed to retrieve group information.');
        }
    }
};