const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        
        // Group check
        if (!chat.isGroup) {
            return await message.reply("❌ This command only works in groups!");
        }

        // Get all participants
        const participants = await chat.participants;
        
        // Get recent active members (last 24 hours)
        const activeMembers = [];
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Check last presence (approximate)
        for (const participant of participants) {
            try {
                const contact = await client.getContactById(participant.id._serialized);
                if (contact.lastSeen && new Date(contact.lastSeen * 1000) > oneDayAgo) {
                    activeMembers.push(contact);
                }
            } catch (error) {
                console.log(chalk.yellow(`[PRIVACY] Couldn't check last seen for ${participant.id.user}`));
            }
        }

        // Format response
        if (activeMembers.length === 0) {
            await message.reply("ℹ️ No recently active members found (last 24 hours)");
        } else {
            const activeList = activeMembers
                .map(member => `• @${member.id.user} (last active: ${member.lastSeen ? new Date(member.lastSeen * 1000).toLocaleTimeString() : 'unknown'})`)
                .join('\n');
            
            await message.reply(
                `🟢 *Recently Active Members* (last 24h):\n\n` +
                `${activeList}\n\n` +
                `_Note: Limited by WhatsApp privacy restrictions_`
            );
        }

        console.log(chalk.green(
            `[ACTIVE MEMBERS] Listed ${activeMembers.length} active members in ${chat.name}`
        ));

    } catch (error) {
        console.error(chalk.red(
            `[ACTIVE MEMBERS ERROR] ${error.message}\n` +
            `In chat: ${message.from}`
        ));
        await message.reply(
            "❌ Couldn't check active members\n" +
            "This may be due to privacy restrictions."
        );
    }
};