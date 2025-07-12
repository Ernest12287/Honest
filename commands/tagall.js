// commands/tagall.js
const tagAllHandler = require('../lib/tagAllHandler'); // Path relative to commands/tagall.js

module.exports = {
    name: 'tagall', // The command trigger (e.g., "!tagall")
    description: 'Tags all members in a group chat.',
    category: 'Group',
    groupOnly: true, // This command is inherently group-specific
    
    async execute(client, message, args, commands) {
        // The tagAllHandler function should be designed to take the client and message.
        await tagAllHandler(client, message); 
    }
};