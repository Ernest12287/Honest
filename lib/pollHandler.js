const chalk = require('chalk');

module.exports = async (client, message) => {
    try {
        const chat = await message.getChat();
        
        // Group check
        if (!chat.isGroup) {
            return await message.reply("❌ This command only works in groups!");
        }

        // Extract poll content
        const pollContent = message.body.split('!poll')[1]?.trim();
        if (!pollContent) {
            return await message.reply(
                "📝 *How to create a poll:*\n" +
                "```!poll [Your question], [Option1], [Option2], [Option3]```\n" +
                "Example: ```!poll How do monkeys sleep, Up, Down, Straight (choose one)```"
            );
        }

        // Parse question and options
        const parts = pollContent.split(',').map(p => p.trim());
        const question = parts[0].endsWith('?') ? parts[0] : parts[0] + '?';
        const options = parts.slice(1).filter(o => o.length > 0);

        // Validation
        if (options.length < 2) {
            return await message.reply(
                "⚠️ *Poll needs at least 2 options!*\n" +
                "Correct format: ```!poll Question, Option1, Option2```"
            );
        }

        if (options.length > 5) {
            return await message.reply("❌ Maximum 5 options allowed for clarity!");
        }

        // Format poll message
        const formattedOptions = options.map((option, i) => 
            `\n${i+1}️⃣  *${option}*`
        ).join('');

        const pollMessage = 
            `📊  *POLL: ${question.toUpperCase()}*\n` +
            `_Please react with the number of your choice!_\n` +
            `${formattedOptions}\n\n` +
            `🕒 Poll created by @${message.author || message.from}`;

        // Send poll and react with number emojis
        const sentPoll = await message.reply(pollMessage);
        
        // Add number reactions (1-5)
        for (let i = 0; i < options.length; i++) {
            await sentPoll.react(`${i+1}️⃣`);
        }

        console.log(chalk.green(
            `[POLL] Created in ${chalk.bold(chat.name)}: ` +
            `${question} (${options.length} options)`
        ));

    } catch (error) {
        console.error(chalk.red(
            `[POLL ERROR] In ${message.from}: ${error.message}`
        ));
        await message.reply(
            "❌ Failed to create poll\n" +
            `Error: ${error.message.includes('reaction') ? 
             'Bot needs admin rights to add reactions' : 
             'Please try again'}`
        );
    }
};

//kinda works