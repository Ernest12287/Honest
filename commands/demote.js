// commands/demote.js
const demoteHandler = require('../lib/demoteHandler'); // Path relative to commands/demote.js

module.exports = {
    name: 'demote',
    description: 'Demotes a user from admin in the group. Usage: !demote @user',
    category: 'Group',
    groupOnly: true, // Demoting is typically a group admin action
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing demoteHandler, passing client and message.
        await demoteHandler(client, message); 
    }
};