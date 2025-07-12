// commands/addlabels.js
module.exports = {
    name: 'addlabels',
    description: 'Adds new labels to the current chat (preserves existing labels). Requires a Business Account. Usage: !addlabels <label_id1> <label_id2> ...',
    category: 'Business',
    groupOnly: false,
    async execute(client, message, args, commands) {
        // Check if bot is a Business Account
        if (!(await client.isBusinessAccount())) {
            return await message.reply('This command requires the bot to be a WhatsApp Business Account.');
        }

        const chat = await message.getChat();
        
        try {
            // Get current labels and add new ones
            let currentLabels = (await chat.getLabels()).map((l) => l.id);
            const newLabelIds = args.map(id => id.toString());
            
            // Filter out duplicates and add new ones
            const combinedLabels = [...new Set([...currentLabels, ...newLabelIds])];

            await chat.changeLabels(combinedLabels);
            await message.reply(`Labels added/updated for this chat. Current labels: [${combinedLabels.join(', ')}]`);
        } catch (error) {
            console.error('Error adding labels:', error);
            await message.reply('Failed to add labels. Ensure you have a Business Account and valid label IDs.');
        }
    }
};