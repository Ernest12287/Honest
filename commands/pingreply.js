// commands/pingreply.js
module.exports = {
    name: 'pingreply',
    description: 'Replies to your message with "pong".',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        await message.reply('pong');
    }
};