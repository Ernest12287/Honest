// commands/statusemoji.js
const statusEmojiHandler = require('../lib/statusEmojiHandler'); // Path relative to commands/statusemoji.js

module.exports = {
    name: 'statusemoji', // The command trigger (e.g., "!statusemoji")
    description: 'Sets a custom status emoji for the bot (requires specific bot capabilities).',
    category: 'Utility',
    groupOnly: false, // Can be set from anywhere
    
    async execute(client, message, args, commands) {
        // The statusEmojiHandler function should be designed to take the client and message.
        await statusEmojiHandler(client, message); 
    }
};