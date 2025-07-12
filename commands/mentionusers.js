// commands/mentionusers.js
module.exports = {
    name: 'mentionusers',
    description: 'Mentions specified users in the current chat. Usage: !mentionusers @user1 @user2 ... or <number1> <number2> ...',
    category: 'Group',
    groupOnly: true, // User mentions are most useful in groups
    async execute(client, message, args, commands) {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return await message.reply('This command is primarily intended for group chats.');
        }

        if (args.length === 0) {
            return await message.reply('Please provide numbers or @mentions of users to tag. Usage: !mentionusers @user1 1234567890');
        }

        const userIdsToMention = [];
        let mentionString = 'Hello ';

        for (const arg of args) {
            let userId = '';
            if (arg.startsWith('@')) {
                userId = `${arg.substring(1).replace(/[^0-9]/g, '')}@c.us`;
            } else if (/^\d+$/.test(arg)) {
                userId = `${arg}@c.us`;
            } else {
                await message.reply(`Skipping invalid user format: ${arg}`);
                continue;
            }

            if (userId) {
                userIdsToMention.push(userId);
                mentionString += `@${userId.split('@')[0]} `;
            }
        }

        if (userIdsToMention.length === 0) {
            return await message.reply('No valid users found to mention.');
        }

        try {
            await chat.sendMessage(mentionString.trim(), {
                mentions: userIdsToMention
            });
            await message.reply('Users mentioned.');
        } catch (error) {
            console.error('Error mentioning users:', error);
            await message.reply('Failed to mention users. Ensure they are valid contacts in the group.');
        }
    }
};