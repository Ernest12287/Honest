// commands/mutechat.js
module.exports = {
    name: 'mutechat',
    description: 'Mutes the current chat for 20 seconds. Usage: !mutechat [duration_in_seconds]',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        const chat = await message.getChat();
        let durationSeconds = 20; // Default to 20 seconds

        if (args.length > 0) {
            const parsedDuration = parseInt(args[0], 10);
            if (!isNaN(parsedDuration) && parsedDuration > 0) {
                durationSeconds = parsedDuration;
            } else {
                return await message.reply('Invalid duration. Please provide a positive number of seconds. Defaulting to 20s. Usage: !mutechat [duration_in_seconds]');
            }
        }

        try {
            const unmuteDate = new Date();
            unmuteDate.setSeconds(unmuteDate.getSeconds() + durationSeconds);
            await chat.mute(unmuteDate);
            await message.reply(`This chat has been muted until ${unmuteDate.toLocaleTimeString()} (${durationSeconds} seconds).`);
        } catch (error) {
            console.error('Error muting chat:', error);
            await message.reply('Failed to mute chat.');
        }
    }
};