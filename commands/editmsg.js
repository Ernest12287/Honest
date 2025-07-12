// commands/editmsg.js
module.exports = {
    name: 'editmsg',
    description: 'Edits the bot\'s own quoted message. Reply to one of the bot\'s messages with this command. Usage: !editmsg <new text>',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (!message.hasQuotedMsg) {
            return await message.reply('Please reply to a message I sent to edit it. Usage: !editmsg <new text> (reply to bot message)');
        }

        const quotedMsg = await message.getQuotedMessage();
        const newText = args.join(' ');

        if (!quotedMsg.fromMe) {
            return await message.reply('I can only edit messages that I sent.');
        }
        if (!newText) {
            return await message.reply('Please provide the new text for the message.');
        }

        try {
            await quotedMsg.edit(newText);
            await message.reply('Message edited successfully.');
        } catch (error) {
            console.error('Error editing message:', error);
            await message.reply('Failed to edit message. It might be too old or not editable.');
        }
    }
};