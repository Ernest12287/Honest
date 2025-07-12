// commands/quote.js
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
    { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do not watch the clock. Do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" }
];

module.exports = {
    name: 'quote',
    description: 'Sends an inspirational quote.',
    category: 'Fun', // Added category
    aliases: ['inspire'], // Aliases are good, messageHandler will need to support them
    groupOnly: false, // Quotes can be sent anywhere
    
    // Corrected execute function signature: (client, message, args, commands)
    async execute(client, message, args, commands) {
        try {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            await message.reply(`*"${randomQuote.text}"* - ${randomQuote.author}`);
            console.log(`[QUOTE] Sent quote to ${message.from}`);
        } catch (error) {
            console.error(`[QUOTE ERROR] ${error.message}`);
            await message.reply("Failed to retrieve a quote.");
        }
    }
};