// commands/promote.js
const promoteHandler = require('../lib/promoteHandler'); // Path relative to commands/promote.js

module.exports = {
    name: 'promote',
    description: 'Promotes a user to admin in the group. Usage: !promote @user',
    category: 'Group',
    groupOnly: true, // This command is inherently group-specific
    
    async execute(client, message, args, commands) {
        // The promoteHandler function should be designed to take the client and message.
        await promoteHandler(client, message); 
    }
};