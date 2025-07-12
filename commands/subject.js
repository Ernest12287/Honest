// commands/subject.js
module.exports = {
    name: 'subject',
    description: 'Changes the subject (name) of the group. Usage: !subject <new subject>',
    category: 'Group Admin',
    groupOnly: true, // Only applicable in groups
    async execute(client, message, args, commands) {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return await message.reply('This command can only be used in a group!');
        }

        const newSubject = args.join(' ');
        if (!newSubject) {
            return await message.reply('Please provide a new subject for the group. Usage: !subject <new subject>');
        }

        try {
            await chat.setSubject(newSubject);
            await message.reply(`Group subject changed to: *${newSubject}*`);
        } catch (error) {
            console.error('Error changing group subject:', error);
            await message.reply('Failed to change group subject. Make sure I have admin permissions.');
        }
    }
};