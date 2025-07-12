// commands/mute.js
const muteHandler = require('../lib/muteHandler'); // Path relative to commands/mute.js

module.exports = {
    name: 'mute',
    description: 'Mutes a user for a specified time. Usage: !mute @user [duration]',
    category: 'Admin',
    groupOnly: true, // Muting is typically a group admin action
    
    async execute(client, message, args, commands) {
        await muteHandler(client, message); 
    }
};