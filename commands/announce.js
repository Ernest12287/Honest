// commands/announce.js
const announceHandler = require('../lib/announceHandler'); // Path relative to commands/announce.js

module.exports = {
    name: 'announce',
    description: 'Sends an announcement to the group. Usage: !announce [your message]',
    category: 'Group',
    groupOnly: true, // Announcements are typically group-specific
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing announceHandler, passing client and message.
        await announceHandler(client, message); 
    }
};