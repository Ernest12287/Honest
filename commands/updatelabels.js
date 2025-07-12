// commands/updatelabels.js
module.exports = {
    name: 'updatelabels',
    description: 'Updates labels for the current chat (replaces existing labels). Requires a Business Account. Usage: !updatelabels <label_id1> <label_id2> ...',
    category: 'Business',
    groupOnly: false,
    async execute(client, message, args, commands) {
        // Check if bot is a Business Account
        if (!(await client.isBusinessAccount())) {
            return await message.reply('This command requires the bot to be a WhatsApp Business Account.');
        }

        const chat = await message.getChat();
        const labelIds = args.map(id => id.toString()); // Ensure IDs are strings

        try {
            await chat.changeLabels(labelIds);
            await message.reply(`Labels updated for this chat: [${labelIds.join(', ')}]`);
        } catch (error) {
            console.error('Error updating labels:', error);
            await message.reply('Failed to update labels. Ensure you have a Business Account and valid label IDs.');
        }
    }
};