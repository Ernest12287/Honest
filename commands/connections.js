// commands/connections.js
module.exports = {
    name: 'connections',
    description: 'Shows the number of devices connected to the bot\'s WhatsApp account.',
    category: 'Bot Info',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            // client.info.wid.user is the bot's own number
            const deviceCount = await client.getContactDeviceCount(client.info.wid._serialized);
            await message.reply(`The bot has *${deviceCount}* devices connected (including the phone if active).`);
        } catch (error) {
            console.error('Error getting device connections:', error);
            await message.reply('Failed to retrieve device connection count.');
        }
    }
};