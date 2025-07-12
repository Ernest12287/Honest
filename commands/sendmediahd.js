// commands/sendmediahd.js
module.exports = {
    name: 'sendmediahd',
    description: 'Sends quoted media in HD quality. Reply to a media message with this command.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a media message to send it in HD. Usage: !sendmediahd (reply to media)');
        }

        const quotedMsg = await message.getQuotedMessage();
        if (!quotedMsg.hasMedia) {
            return await message.reply('The quoted message does not contain media.');
        }

        try {
            const media = await quotedMsg.downloadMedia();
            // This is the key option: sendMediaAsHd: true
            await client.sendMessage(message.from, media, { sendMediaAsHd: true, caption: 'Here\'s your media in HD!' });
            await message.reply('Media sent in HD.');
        } catch (error) {
            console.error('Error sending media in HD:', error);
            await message.reply('Failed to send media in HD. This feature may not be supported for all media types or versions.');
        }
    }
};