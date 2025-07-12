// commands/statuses.js
module.exports = {
    name: 'statuses',
    description: 'Retrieves and sends a summary of the bot\'s WhatsApp statuses (broadcasts) to the chat.',
    category: 'Bot Info',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            const statuses = await client.getBroadcasts();
            
            if (statuses.length === 0) {
                return await message.reply('No statuses found.');
            }

            let replyMessage = '--- Bot Broadcast Statuses ---\n';
            for (const status of statuses) {
                // Fetch contact name for 'from'
                const contact = await client.getContactById(status.from);
                const senderName = contact ? contact.pushname || contact.name || contact.number : status.from.split('@')[0];

                replyMessage += `\n- From: ${senderName} (Type: ${status.type})\n`;
                replyMessage += `  Timestamp: ${new Date(status.timestamp * 1000).toLocaleString()}\n`;
                replyMessage += `  Body: ${status.body ? status.body.substring(0, 100) + (status.body.length > 100 ? '...' : '') : '[Media Only]'}\n`;
                if (status.hasMedia) {
                    replyMessage += `  Has Media: Yes, MimeType: ${status.mimetype}\n`;
                }
                // Optional: Get associated chat name if needed, but might be slow for many statuses
                // const chat = await status.getChat();
                // if (chat) {
                //     replyMessage += `  Associated Chat Name: ${chat.name || 'N/A'}\n`;
                // }
                replyMessage += '------------------------------\n';
            }
            await message.reply(replyMessage);

        } catch (error) {
            console.error('Error getting statuses:', error);
            await message.reply('Failed to retrieve statuses. An error occurred.');
        }
    }
};