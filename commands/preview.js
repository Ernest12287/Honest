// commands/preview.js
module.exports = {
    name: 'preview',
    description: 'Replies with your text, showing a link preview if a link is detected. Usage: !preview <text with link>',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        const text = args.join(' ');
        if (!text) {
            return await message.reply('Please provide text for the preview. Usage: !preview <text with link>');
        }
        await message.reply(text, null, { linkPreview: true });
    }
};