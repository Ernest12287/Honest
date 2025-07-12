// commands/pinchat.js
module.exports = {
    name: 'pinchat',
    description: 'Pins the current chat to the top of your chat list.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            const chat = await message.getChat();
            await chat.pin();
            await message.reply('This chat has been pinned.');
        } catch (error) {
            console.error('Error pinning chat:', error);
            await message.reply('Failed to pin chat. This feature might not be available or an error occurred.');
        }
    }
};