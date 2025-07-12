// commands/weather.js
const weatherHandler = require('../lib/weatherHandler'); // Path relative to commands/weather.js

module.exports = {
    name: 'weather', // The command trigger (e.g., "!weather")
    description: 'Know the current weather details of somewhere. Usage: !weather [city name]',
    category: 'Utility', // Corrected category if "weather" was meant as a type, not a category
    groupOnly: false, // Assuming weather command can be used in DMs as well
    
    async execute(client, message, args, commands) {
        // The weatherHandler function should be designed to take the client and message
        // and then extract the city from message.body itself.
        await weatherHandler(client, message); 
    }
};