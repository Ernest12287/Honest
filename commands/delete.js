// commands/deletemsg.js
module.exports = {
    name: 'deletemsg',
    description: 'Deletes the bot\'s own quoted message. Reply to one of the bot\'s messages with this command.',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a message I sent to delete it. Usage: !deletemsg (reply to bot message)');
        }

        const quotedMsg = await message.getQuotedMessage();

        if (!quotedMsg.fromMe) {
            return await message.reply('I can only delete messages that I sent.');
        }

        try {
            await quotedMsg.delete(true); // 'true' for delete for everyone
            // Note: Bot cannot reply after deleting its own message in some cases
            console.log(`Bot deleted its own message: ${quotedMsg.id._serialized}`);
        } catch (error) {
            console.error('Error deleting message:', error);
            await message.reply('Failed to delete the message. It might be too old or I lack permissions.');
        }
    }
};