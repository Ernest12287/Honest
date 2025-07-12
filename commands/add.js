// commands/addmembers.js
module.exports = {
    name: 'add',
    description: 'Adds specified members to the current group. Usage: !addmembers <@user1> <@user2> ... or <number1> <number2> ...',
    category: 'Group Admin',
    groupOnly: true, // Only applicable in groups
    async execute(client, message, args, commands) {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            return await message.reply('This command can only be used in a group!');
        }

        if (!args.length) {
            return await message.reply('Please provide the numbers or mention users to add. Usage: !addmembers <@user1> <number2> ...');
        }

        const participantsToAdd = [];
        const mentions = [];

        for (const arg of args) {
            if (arg.startsWith('@')) {
                // If it's a mention, resolve it to an ID
                const contactId = `${arg.substring(1).replace(/[^0-9]/g, '')}@c.us`; // Basic cleanup
                if (contactId) {
                    participantsToAdd.push(contactId);
                    mentions.push(contactId); // Collect for sendMessage if needed
                }
            } else if (/^\d+$/.test(arg)) {
                // If it's just a number
                participantsToAdd.push(`${arg}@c.us`);
            } else {
                await message.reply(`Skipping invalid participant format: ${arg}`);
            }
        }

        if (participantsToAdd.length === 0) {
            return await message.reply('No valid participants found to add.');
        }

        try {
            const result = await chat.addParticipants(participantsToAdd);
            let response = 'Attempted to add participants:\n';
            for (const number in result) {
                response += `- ${number.split('@')[0]}: ${result[number].message || 'Unknown result'}\n`;
            }
            await message.reply(response);
            console.log(result); // Log the detailed result to console
        } catch (error) {
            console.error('Error adding members:', error);
            await message.reply('Failed to add members. Make sure I have admin permissions and the numbers are valid WhatsApp users.');
        }
    }
};