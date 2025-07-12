// commands/menu.js
const menuHandler = require('../lib/menuHandler'); // Path relative to commands/menu.js

module.exports = {
    name: 'menu',
    description: 'Shows all available commands.',
    category: 'Utilities',
    groupOnly: false, // Can be used in DMs or groups
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Correctly call your existing menuHandler, passing the `commands` object
        await menuHandler(client, message, commands); 
    }
};