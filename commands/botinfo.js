// commands/botinfo_extended.js
module.exports = {
    name: 'botinfo',
    description: 'Displays extended connection information about the bot (username, number, platform).',
    category: 'Bot Info',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            let info = client.info;
            await client.sendMessage(message.from, `
*Connection Info*
User Name: ${info.pushname}
My Number: ${info.wid.user}
Platform: ${info.platform}
            `.trim());
        } catch (error) {
            console.error('Error getting bot info:', error);
            await message.reply('Failed to retrieve bot connection information.');
        }
    }
};