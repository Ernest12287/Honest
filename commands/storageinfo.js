// commands/storageinfo.js
const storageInfoHandler = require('../lib/storageInfoHandler'); // Path relative to commands/storageinfo.js

module.exports = {
    name: 'storageinfo', // The command trigger (e.g., "!storageinfo")
    description: 'Checks storage information of the bot environment.',
    category: 'System',
    groupOnly: false, // Assuming storage info can be checked in DMs or groups
    
    async execute(client, message, args, commands) {
        // The storageInfoHandler function should be designed to take the client and message.
        await storageInfoHandler(client, message); 
    }
};