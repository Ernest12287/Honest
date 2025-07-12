// commands/remind.js
const remindHandler = require('../lib/remindHandler'); // Path relative to commands/remind.js

module.exports = {
    name: 'remind',
    description: 'Sets a reminder. Usage: !remind <time> <message>',
    category: 'Utility',
    groupOnly: false, // Assuming reminders can be set in DMs or groups
    
    async execute(client, message, args, commands) {
        // The remindHandler function should be designed to take the client and message.
        await remindHandler(client, message); 
    }
};