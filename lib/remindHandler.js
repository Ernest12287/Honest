const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const args = message.body.split(' ').slice(1);
        
        // Validate input
        if (args.length < 2) {
            return await message.reply("Usage: !remind <time> <message>\nExample: !remind 300 Buy milk");
        }

        const time = args[0];
        const reminderMessage = args.slice(1).join(' ');
        
        // Validate time is a number
        if (isNaN(time) || time <= 0) {
            return await message.reply("Please enter a valid positive number for time (in seconds)");
        }

        // Convert to milliseconds and set timeout
        const milliseconds = parseInt(time) * 1000;
        
        // Store the timeout reference so it persists
        const timeoutRef = setTimeout(async () => {
            try {
                await message.reply(`⏰ REMINDER: ${reminderMessage}`);
                console.log(chalk.green(`[REMINDER SENT] "${reminderMessage}" to ${message.from}`));
            } catch (err) {
                console.error(chalk.red(`[REMINDER FAILED] Could not send to ${message.from}: ${err.message}`));
            }
        }, milliseconds);

        // Store the timeout in client for potential cancellation
        if (!client.reminders) client.reminders = new Map();
        client.reminders.set(message.id._serialized, timeoutRef);

        await message.reply(`✅ I'll remind you in ${time} seconds about:\n"${reminderMessage}"`);
        console.log(chalk.green(`[REMINDER SET] "${reminderMessage}" for ${message.from} in ${time}s`));

    } catch (error) {
        console.error(chalk.red(`[REMIND ERROR] ${error.message}`));
        await message.reply("⚠️ Failed to set reminder. Please try again.");
    }
};
//works