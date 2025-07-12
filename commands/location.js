// commands/location_send.js
const { Location } = require('whatsapp-web.js'); // Import Location class

module.exports = {
    name: 'location',
    description: 'Sends a sample location. Usage: !location_send [name] [address]',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        // Example provides hardcoded locations. Let's make it send a default one.
        // If you want to make it dynamic, you'd parse args for lat, long, name, address.
        const defaultLat = 37.422;
        const defaultLong = -122.084;
        let locationName = 'Googleplex';
        let locationAddress = '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA';

        if (args.length >= 1) {
            locationName = args[0];
            if (args.length >= 2) {
                locationAddress = args.slice(1).join(' ');
            }
        }

        try {
            // Using only latitude and longitude
            await message.reply(new Location(defaultLat, defaultLong));
            
            // Using name and address
            await message.reply(new Location(defaultLat, defaultLong, { name: locationName, address: locationAddress }));
            
            // Or just reply to let user know it was sent.
            // await message.reply('Sent sample location.');
        } catch (error) {
            console.error('Error sending location:', error);
            await message.reply('Failed to send location.');
        }
    }
};