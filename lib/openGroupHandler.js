const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        
        // Group check
        if (!chat.isGroup) {
            return await message.reply("❌ This command only works in groups!");
        }

        // Check if user has admin privileges
        const participant = await chat.getParticipant(message.author || message.from);
        if (!participant.isAdmin && !participant.isSuperAdmin) {
            return await message.reply("⛔ You need to be an admin to use this command!");
        }

        // Correct way to change group settings
        await chat.setMessagesAdminsOnly(false); // Allow all participants to send messages
        await chat.setInfoAdminsOnly(false);     // Allow all to edit group info
        
        // WhatsApp doesn't have a direct "open/close group" API
        // This is the closest functionality:
        await chat.setGroupToPublic();           // Makes invite link work
        
        await message.reply(
            "🔓 *Group settings updated:*\n\n" +
            "• All members can now send messages\n" +
            "• Group info can be edited by all\n" +
            "• Invite link is active"
        );
        
        console.log(chalk.green(
            `[GROUP OPENED] ${chat.name} by ${message.author || message.from}`
        ));

    } catch (error) {
        console.error(chalk.red(
            `[GROUP ERROR] In ${message.from}: ${error.message}`
        ));
        await message.reply(
            "❌ Failed to update group settings\n" +
            `Error: ${error.message.includes('401') ? 
             'Missing admin privileges' : 
             'Please try again later'}`
        );
    }
};

//nope dstnt works