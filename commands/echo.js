// commands/echo.js
module.exports = {
    name: 'echo',
    description: 'Repeats your message back to you. Usage: !echo <your message>',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        const textToEcho = args.join(' ');
        if (!textToEcho) {
            return await message.reply('Please provide a message to echo. Usage: !echo <your message>');
        }
        await message.reply(textToEcho);
    }
};