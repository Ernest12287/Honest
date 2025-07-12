// commands/help.js
const helpHandler = require('../lib/helpHandler'); // Path relative to commands/help.js

module.exports = {
    name: 'help',
    description: 'Shows how to use the bot and lists available commands.',
    category: 'Assistance',
    groupOnly: false, // Help can be requested in DMs or groups
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing helpHandler.
        // If helpHandler also needs the full commands object to list them,
        // you would pass it like: await helpHandler(client, message, commands);
        // Based on your original, it only takes client and message, so we'll stick to that.
        await helpHandler(client, message); 
    }
};