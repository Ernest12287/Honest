// commands/welcome.js (Corrected version)
const welcomeHandler = require('../lib/welcomeHandler'); // Path relative to commands/welcome.js

module.exports = {
    // 1. Add the 'name' property for the command trigger
    name: 'welcome', 
    
    // 2. Add description and category directly to this exported object
    description: 'Set/update the welcome message for new group members. Usage: !welcome [your message with @mention]',
    category: 'Group',
    
    // Optional: Add a property if this command should only work in groups
    groupOnly: true, 

    // 3. Wrap your command's execution logic in the 'execute' property
    async execute(client, message, args, commands) {
        // Since welcomeHandler expects `client` and `message`, 
        // you can call it directly here.
        // The message.body will be processed by welcomeHandler for the actual message.
        await welcomeHandler(client, message);
    }
};