// commands/sendpoll.js
const { Poll } = require('whatsapp-web.js'); // Import Poll class

module.exports = {
    name: 'sendpoll',
    description: 'Sends a poll. Usage: !sendpoll "Question" "Option1" "Option2" ... [--multi]',
    category: 'Interactive',
    groupOnly: false,
    async execute(client, message, args, commands) {
        // Parse arguments for question and options, handling quoted strings
        const regex = /"([^"]*)"/g;
        let match;
        const parts = [];
        while ((match = regex.exec(message.body)) !== null) {
            parts.push(match[1]);
        }

        if (parts.length < 3) { // Minimum 1 question, 2 options
            return await message.reply('Please provide a question and at least two options, enclosed in quotes. Usage: !sendpoll "Your Question?" "Option A" "Option B" [--multi]');
        }

        const question = parts[0];
        const options = parts.slice(1);
        
        const allowMultipleAnswers = args.includes('--multi'); // Check for optional flag

        try {
            await message.reply(new Poll(question, options, { allowMultipleAnswers: allowMultipleAnswers }));
            await message.reply(`Poll "${question}" sent.`);
        } catch (error) {
            console.error('Error sending poll:', error);
            await message.reply('Failed to send poll. Ensure your WhatsApp version supports polls.');
        }
    }
};