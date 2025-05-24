const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const emoji = message.body.split('!ste ')[1];
        if (!emoji) {
            return await message.reply("Please provide an emoji to set as status!");
        }

        statusEmoji = emoji;
        await message.reply(`Status emoji set to: ${emoji}`);
        console.log(chalk.green(`[STATUS EMOJI] Set status emoji to: ${emoji}`));
    } catch (error) {
        console.error(chalk.red(`[STATUS EMOJI ERROR] ${error.message}`));
        await message.reply("Failed to set status emoji");
    }
};
// just do not get his use case