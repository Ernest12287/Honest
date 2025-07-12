// commands/archivechat.js
module.exports = {
    name: 'archivechat',
    description: 'Archives the current chat.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            const chat = await message.getChat();
            await chat.archive();
            await message.reply('This chat has been archived.');
        } catch (error) {
            console.error('Error archiving chat:', error);
            await message.reply('Failed to archive chat.');
        }
    }
};