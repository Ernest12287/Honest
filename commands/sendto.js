// commands/sendto.js
module.exports = {
    name: 'sendto',
    description: 'Sends a message to a specific WhatsApp number. Usage: !sendto <number> <message>',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        if (args.length < 2) {
            return await message.reply('Please provide a number and a message. Usage: !sendto <number> <message>');
        }

        let number = args[0];
        const messageToSend = args.slice(1).join(' ');

        // Ensure number is in correct format
        number = number.includes('@c.us') ? number : `${number}@c.us`;

        try {
            const chat = await client.getChatById(number); // Try to get the chat to ensure it's valid
            if (chat) {
                await chat.sendSeen(); // Mark as seen
                await client.sendMessage(number, messageToSend);
                await message.reply(`Message sent to ${number.split('@')[0]}.`);
            } else {
                await message.reply(`Could not find a chat with ${number.split('@')[0]}.`);
            }
        } catch (error) {
            console.error('Error sending message to specific number:', error);
            await message.reply('Failed to send message. Please check the number format.');
        }
    }
};