// commands/join.js
module.exports = {
    name: 'join',
    description: 'Makes the bot join a group using an invite code. Usage: !join <invite code>',
    category: 'Group',
    groupOnly: false, // Can be used in DMs to join a group
    async execute(client, message, args, commands) {
        const inviteCode = args[0];
        if (!inviteCode) {
            return await message.reply('Please provide an invite code. Usage: !join <invite code>');
        }

        try {
            await client.acceptInvite(inviteCode);
            await message.reply('Joined the group successfully!');
        } catch (error) {
            console.error('Error joining group:', error);
            await message.reply('That invite code seems to be invalid or expired, or I do not have permission.');
        }
    }
};