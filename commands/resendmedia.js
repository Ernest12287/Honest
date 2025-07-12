// commands/resendmedia.js
module.exports = {
    name: 'resendmedia',
    description: 'Resends the media from a quoted message. Can send as voice if audio. Reply to a media message with this command.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a media message to resend it. Usage: !resendmedia (reply to media)');
        }

        const quotedMsg = await message.getQuotedMessage();
        if (!quotedMsg.hasMedia) {
            return await message.reply('The quoted message does not contain media.');
        }

        try {
            const attachmentData = await quotedMsg.downloadMedia();
            if (quotedMsg.type === 'audio') {
                await client.sendMessage(message.from, attachmentData, { sendAudioAsVoice: true, caption: 'Here\'s your requested audio as voice.' });
            } else {
                await client.sendMessage(message.from, attachmentData, { caption: 'Here\'s your requested media.' });
            }
        } catch (error) {
            console.error('Error resending media:', error);
            await message.reply('Failed to resend media. It might be too large or unretrievable.');
        }
    }
};