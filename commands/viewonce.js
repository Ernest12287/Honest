// commands/viewonce.js
module.exports = {
    name: 'viewonce',
    description: 'Sends quoted media as a view-once message. Reply to a media message with this command.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a media message to send it as view once. Usage: !viewonce (reply to media)');
        }

        const quotedMsg = await message.getQuotedMessage();
        if (!quotedMsg.hasMedia) {
            return await message.reply('The quoted message does not contain media.');
        }

        try {
            const media = await quotedMsg.downloadMedia();
            await client.sendMessage(message.from, media, { isViewOnce: true });
            await message.reply('Media sent as view once.');
        } catch (error) {
            console.error('Error sending media as view once:', error);
            await message.reply('Failed to send media as view once.');
        }
    }
};