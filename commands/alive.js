// commands/alive.js
const aliveHandler = require('../lib/aliveHandler'); // Path relative to commands/alive.js

module.exports = {
    name: 'alive',
    description: 'Checks if the bot is currently running and responsive.',
    category: 'Utility',
    groupOnly: false, // Can be used in DMs or groups
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing aliveHandler, passing client and message.
        await aliveHandler(client, message); 
    }
};