// commands/creategroup_new.js
module.exports = {
    name: 'creategroup_new',
    description: 'Creates a new group with a specified title and participants. Usage: !creategroup_new "Group Name" @user1 @user2 ... or <number1> <number2> ...',
    category: 'Group',
    groupOnly: false, // Can be used in DMs to create a group
    async execute(client, message, args, commands) {
        if (args.length < 2) {
            return await message.reply('Please provide a group title and at least one participant. Usage: !creategroup_new "Group Name" @user1 @user2 ...');
        }

        let groupTitle = '';
        const participantsToAdd = [];

        // Try to parse group title in quotes
        const titleMatch = message.body.match(/"([^"]*)"/);
        if (titleMatch && titleMatch[1]) {
            groupTitle = titleMatch[1];
            // Remove the title part from the message body to get remaining args
            const remainingBody = message.body.slice(message.body.indexOf(titleMatch[0]) + titleMatch[0].length).trim();
            const remainingArgs = remainingBody.split(/ +/).filter(Boolean); // Filter out empty strings
            
            for (const arg of remainingArgs) {
                if (arg.startsWith('@')) {
                    participantsToAdd.push(`${arg.substring(1).replace(/[^0-9]/g, '')}@c.us`);
                } else if (/^\d+$/.test(arg)) {
                    participantsToAdd.push(`${arg}@c.us`);
                } else {
                    await message.reply(`Skipping invalid participant/argument: ${arg}`);
                }
            }
        } else {
            // If no quotes, first arg is title, rest are participants (less robust)
            groupTitle = args[0];
            for (let i = 1; i < args.length; i++) {
                const arg = args[i];
                if (arg.startsWith('@')) {
                    participantsToAdd.push(`${arg.substring(1).replace(/[^0-9]/g, '')}@c.us`);
                } else if (/^\d+$/.test(arg)) {
                    participantsToAdd.push(`${arg}@c.us`);
                } else {
                    await message.reply(`Skipping invalid participant/argument: ${arg}`);
                }
            }
        }

        if (!groupTitle) {
            return await message.reply('No valid group title found. Please enclose it in quotes if it has spaces.');
        }
        if (participantsToAdd.length === 0) {
            return await message.reply('No valid participants found to add to the group. Please provide numbers or @mentions.');
        }

        try {
            const result = await client.createGroup(groupTitle, participantsToAdd);
            let response = `Group "${result.title}" created successfully!\n`;
            response += 'Participants added:\n';
            for (const number in result.participants) {
                response += `- ${number.split('@')[0]}: ${result.participants[number].message || 'Success'}\n`;
            }
            await message.reply(response);
            console.log(result); // Log the detailed result
        } catch (error) {
            console.error('Error creating group:', error);
            await message.reply('Failed to create group. Ensure all participants are valid WhatsApp users.');
        }
    }
};