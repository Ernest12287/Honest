// commands/createGroup.js
const createGroupHandler = require('../lib/createGroupHandler'); // Path relative to commands/createGroup.js

module.exports = {
    name: 'creategroup',
    description: 'Creates a new group with specified participants. Usage: !creategroup "Group Name" @user1 @user2 ...',
    category: 'Group',
    groupOnly: false, // Can be initiated from DMs, but creates a group
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing createGroupHandler, passing client and message.
        await createGroupHandler(client, message); 
    }
};