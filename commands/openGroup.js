// commands/openGroup.js
const openGroupHandler = require('../lib/openGroupHandler'); // Path relative to commands/openGroup.js

module.exports = {
    name: 'opengroup', // Assuming the command is !opengroup
    description: 'Opens the group to new participants (allows anyone with the link to join).',
    category: 'Group',
    groupOnly: true, // This command is inherently group-specific
    
    async execute(client, message, args, commands) {
        await openGroupHandler(client, message); 
    }
};