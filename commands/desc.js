// commands/desc.js
module.exports = {
    name: 'desc',
    description: 'Changes the description of the group. Usage: !desc <new description>',
    category: 'Group Admin',
    groupOnly: true, // Only applicable in groups
    async execute(client, message, args, commands) {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return await message.reply('This command can only be used in a group!');
        }

        const newDescription = args.join(' ');
        if (!newDescription) {
            return await message.reply('Please provide a new description for the group. Usage: !desc <new description>');
        }

        try {
            await chat.setDescription(newDescription);
            await message.reply(`Group description changed to: *${newDescription}*`);
        } catch (error) {
            console.error('Error changing group description:', error);
            await message.reply('Failed to change group description. Make sure I have admin permissions.');
        }
    }
};