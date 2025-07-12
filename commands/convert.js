// commands/convert.js
const convertHandler = require('../lib/convertHandler'); // Path relative to commands/convert.js

module.exports = {
    name: 'convert',
    description: 'Converts currencies. Usage: !convert <amount> <from_currency> to <to_currency>',
    category: 'Utilities',
    groupOnly: false, // Can be used in DMs or groups
    
    // The execute function receives `commands` (the loaded command map) from messageHandler.js
    async execute(client, message, args, commands) {
        // Call your existing convertHandler, passing client and message.
        await convertHandler(client, message); 
    }
};