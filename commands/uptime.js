// commands/uptime.js
const uptimeHandler = require('../lib/uptimeHandler'); // Path relative to commands/uptime.js

module.exports = {
    name: 'uptime', // The command trigger (e.g., "!uptime")
    description: 'Shows how long the bot has been running since its last restart.',
    category: 'Utilities', 
    groupOnly: false, // Assuming uptime can be checked in DMs or groups
    
    async execute(client, message, args, commands) {
        // The uptimeHandler function should be designed to take the client and message.
        await uptimeHandler(client, message); 
    }
};