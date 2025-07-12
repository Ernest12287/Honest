// commands/quoteinfo.js
module.exports = {
    name: 'quoteinfo',
    description: 'Displays information about a quoted message. Reply to any message with this command.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a message to get its info. Usage: !quoteinfo (reply to message)');
        }

        const quotedMsg = await message.getQuotedMessage();

        try {
            await quotedMsg.reply(`
*Quoted Message Info*
ID: ${quotedMsg.id._serialized}
Type: ${quotedMsg.type}
Author: ${quotedMsg.author ? quotedMsg.author.split('@')[0] : quotedMsg.from.split('@')[0]}
Timestamp: ${new Date(quotedMsg.timestamp * 1000).toLocaleString()}
Has Media? ${quotedMsg.hasMedia ? 'Yes' : 'No'}
Body Preview: ${quotedMsg.body ? quotedMsg.body.substring(0, 50) + (quotedMsg.body.length > 50 ? '...' : '') : 'N/A'}
            `.trim());
        } catch (error) {
            console.error('Error getting quote info:', error);
            await message.reply('Failed to retrieve quoted message information.');
        }
    }
};