// commands/ping.js
const pingHandler = require('../lib/pinghandler'); // Path relative to commands/ping.js

module.exports = {
    name: 'ping',
    description: 'Checks if the bot is alive and responsive.',
    category: 'Utilities',
    groupOnly: false, // Can be used in DMs or groups
    
    async execute(client, message, args, commands) {
        await pingHandler(client, message); 
    }
};