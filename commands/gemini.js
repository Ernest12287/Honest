// commands/gemini.js
const geminiHandler = require('../lib/geminiHandler'); // Path relative to commands/gemini.js

module.exports = {
    name: 'gemini',
    description: "Get responses from Google's Gemini AI. Usage: !gemini [your query]",
    category: 'AI',
    groupOnly: false, // Can be used in DMs or groups
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing geminiHandler, passing client and message.
        // Assuming geminiHandler extracts the query from message.body itself.
        await geminiHandler(client, message); 
    }
};