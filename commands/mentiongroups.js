// commands/mentiongroups.js
module.exports = {
    name: 'mentiongroups',
    description: 'Mentions specified groups in the chat. Usage: !mentiongroups <groupId1> <groupId2> ...',
    category: 'Group',
    groupOnly: false, // Can mention groups from anywhere
    async execute(client, message, args, commands) {
        if (args.length === 0) {
            return await message.reply('Please provide the group IDs to mention. Usage: !mentiongroups <groupId1> <groupId2> ...');
        }

        const groupMentionsData = [];
        let mentionString = 'Check out these groups: ';

        for (const arg of args) {
            // Basic validation for group ID format
            if (arg.endsWith('@g.us') && arg.length > '@g.us'.length) {
                const groupId = arg;
                // You might want to fetch the actual group name here if you want accurate subject
                // For simplicity, we'll use a placeholder or part of the ID as subject.
                const subject = groupId.split('@')[0].substring(0, 10) + '...'; // Example subject
                groupMentionsData.push({ subject: `Group_${subject}`, id: groupId });
                mentionString += `@${groupId} `;
            } else {
                await message.reply(`Skipping invalid group ID format: ${arg}`);
            }
        }

        if (groupMentionsData.length === 0) {
            return await message.reply('No valid group IDs provided for mentioning.');
        }

        try {
            await client.sendMessage(message.from, mentionString.trim(), {
                groupMentions: groupMentionsData
            });
            await message.reply('Groups mentioned.');
        } catch (error) {
            console.error('Error mentioning groups:', error);
            await message.reply('Failed to mention groups.');
        }
    }
};