// commands/mediainfo.js
module.exports = {
    name: 'mediainfo',
    description: 'Displays information about a quoted media message. Reply to a media message with this command.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a media message to get its info. Usage: !mediainfo (reply to media)');
        }

        const quotedMsg = await message.getQuotedMessage();
        if (!quotedMsg.hasMedia) {
            return await message.reply('The quoted message does not contain media.');
        }

        try {
            const attachmentData = await quotedMsg.downloadMedia();
            await message.reply(`
*Media Info*
MimeType: ${attachmentData.mimetype}
Filename: ${attachmentData.filename || 'N/A'}
Data (length): ${attachmentData.data.length} bytes
            `.trim());
        } catch (error) {
            console.error('Error getting media info:', error);
            await message.reply('Failed to retrieve media information. The media might be too large or unretrievable.');
        }
    }
};