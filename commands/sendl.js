// commands/sendtochannel.js
module.exports = {
    name: 'sendtochannel',
    description: 'Sends a message to a predefined WhatsApp Channel. Limited to specific users.',
    category: 'Admin',
    groupOnly: false,
    async execute(client, message, args, commands) {
        // Define the allowed sender numbers (from environment variable)
        const allowedNumbersEnv = process.env.ALLOWED_CHANNEL_UPDATE_USERS;
        const allowedNumbers = allowedNumbersEnv ? allowedNumbersEnv.split(',').map(num => num.trim()) : [];

        // Convert the sender's full JID to just the number for comparison
        const senderNumber = message.from.split('@')[0];

        // Check if the sender is authorized
        if (!allowedNumbers.includes(senderNumber)) {
            console.warn(`Unauthorized attempt to use !sendtochannel from ${senderNumber}.`);
            return await message.reply('You are not authorized to use this command.');
        }

        // Get the Channel ID from environment variable
        const channelId = process.env.CHANNEL_UPDATE_ID;
        if (!channelId) {
            console.error('CHANNEL_UPDATE_ID environment variable is not set.');
            return await message.reply('Error: Channel ID is not configured. Please contact the bot owner.');
        }

        if (args.length === 0) {
            return await message.reply('Please provide a message to send to the channel. Usage: !sendtochannel <your message>');
        }

        const messageToSend = args.join(' ');

        try {
            // Get the Channel object
            // whatsapp-web.js typically expects channel IDs to end with @newsletter or @broadcast
            const fullChannelId = channelId.includes('@') ? channelId : `${channelId}@newsletter`;
            const channel = await client.getChatById(fullChannelId);

            if (!channel || !channel.isChannel) {
                console.error(`Channel with ID ${fullChannelId} not found or is not a channel.`);
                return await message.reply('Error: The specified channel was not found or is not a valid channel.');
            }

            // Check if the bot can send messages to the channel (i.e., not read-only for the bot)
            if (channel.isReadOnly) {
                console.warn(`Bot tried to send message to read-only channel: ${fullChannelId}`);
                return await message.reply('Error: I do not have permission to send messages to this channel (it might be read-only for me).');
            }

            // Send the message to the channel
            await channel.sendMessage(messageToSend);
            await message.reply(`Message sent to channel: "${messageToSend.substring(0, 50)}..."`);
            console.log(`Successfully sent message to channel ${fullChannelId} from ${senderNumber}.`);

        } catch (error) {
            console.error(`Error sending message to channel ${channelId} from ${senderNumber}:`, error);
            await message.reply(`An error occurred while trying to send the message to the channel: ${error.message}`);
        }
    }
};