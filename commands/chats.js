// commands/chats.js
module.exports = {
    name: 'chats',
    description: 'Shows the total number of open chats the bot has.',
    category: 'Bot Info',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            const chats = await client.getChats();
            await client.sendMessage(message.from, `The bot has ${chats.length} chats open.`);
        } catch (error) {
            console.error('Error getting chat count:', error);
            await message.reply('Failed to retrieve chat count.');
        }
    }
};