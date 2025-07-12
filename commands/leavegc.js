// commands/leavegc.js
module.exports = {
    name: 'leavegc',
    description: 'Makes the bot leave the current group.',
    category: 'Group',
    groupOnly: true, // Only applicable in groups
    async execute(client, message, args, commands) {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return await message.reply('This command can only be used in a group!');
        }

        try {
            await chat.leave();
            // Note: The bot won't be able to reply after leaving.
            console.log(`Bot left group: ${chat.name || chat.id._serialized}`);
        } catch (error) {
            console.error('Error leaving group:', error);
            await message.reply('Failed to leave the group. Make sure I have permission.');
        }
    }
};