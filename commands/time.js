// commands/time.js
const timeHandler = require('../lib/timeHandler'); // Path relative to commands/time.js

module.exports = {
    name: 'time', // The command trigger (e.g., "!time")
    description: 'Gets the current time.',
    category: 'Utility',
    groupOnly: false, // Assuming time can be checked in DMs or groups
    
    async execute(client, message, args, commands) {
        // The timeHandler function should be designed to take the client and message.
        await timeHandler(client, message); 
    }
};