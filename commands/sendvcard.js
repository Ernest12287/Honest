// commands/sendvcard.js
module.exports = {
    name: 'sendvcard',
    description: 'Sends a sample contact card (vCard) using your provided details. Usage: !sendvcard [number]',
    category: 'Utility',
    groupOnly: false,
    async execute(client, message, args, commands) {
        let targetNumber = message.from; // Default to sender if no number provided

        if (args.length > 0 && /^\d+$/.test(args[0])) {
            targetNumber = `${args[0]}@c.us`;
        } else if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage();
            targetNumber = quotedMsg.from; // Send to the sender of the quoted message
        }

        // Your provided details, Ernest!
        const yourName = 'Ernest AKA ACEPHAR';
        const yourEmail = 'peaseernest8@gmail.com';
        const yourPhoneNumber = '254793859108'; // WhatsApp expects 254793859108 for this, so just number
        const yourAchievement = 'Owner of Ernest Tech House';
        const yourMotto = 'Do me a favor and leave';

        // Construct a vCard string with your details
        const vCardErnest =
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            `FN:${yourName}\n` +
            `ORG:${yourAchievement};\n` +
            `EMAIL;type=INTERNET:${yourEmail}\n` +
            // TEL with waid is for showing WhatsApp number correctly
            `TEL;type=CELL;type=VOICE;waid=${yourPhoneNumber}:+${yourPhoneNumber}\n` +
            `NOTE:${yourMotto}\n` +
            'END:VCARD';

        try {
            await client.sendMessage(targetNumber, vCardErnest);
            await message.reply(`Sent your vCard (${yourName}) to ${targetNumber.split('@')[0]}.`);
        } catch (error) {
            console.error('Error sending vCard:', error);
            await message.reply('Failed to send vCard. Ensure the target number is valid.');
        }
    }
};