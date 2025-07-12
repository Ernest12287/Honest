// commands/removelabels.js
module.exports = {
    name: 'removelabels',
    description: 'Removes all labels from the current chat. Requires a Business Account.',
    category: 'Business',
    groupOnly: false,
    async execute(client, message, args, commands) {
        // Check if bot is a Business Account
        if (!(await client.isBusinessAccount())) {
            return await message.reply('This command requires the bot to be a WhatsApp Business Account.');
        }

        const chat = await message.getChat();

        try {
            await chat.changeLabels([]); // Pass an empty array to remove all labels
            await message.reply('All labels removed from this chat.');
        } catch (error) {
            console.error('Error removing labels:', error);
            await message.reply('Failed to remove labels. Ensure you have a Business Account.');
        }
    }
};