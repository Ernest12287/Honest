// commands/listmsg.js
const { List } = require('whatsapp-web.js'); // Import List class

module.exports = {
    name: 'listmsg',
    description: 'Sends an interactive list message. (Compatibility may vary).',
    category: 'Interactive',
    groupOnly: false,
    async execute(client, message, args, commands) {
        try {
            let sections = [
                { 
                    title: 'Main Options', 
                    rows: [
                        { id: 'item1', title: 'List Item 1', description: 'Description for item 1' }, 
                        { id: 'item2', title: 'List Item 2', description: 'Description for item 2' }
                    ]
                },
                {
                    title: 'More Options',
                    rows: [
                        { id: 'item3', title: 'List Item 3' },
                        { id: 'item4', title: 'List Item 4', description: 'Another description' }
                    ]
                }
            ];
            let list = new List(
                'This is the body of the list message. Select an item:', 
                'View List', // Button text
                sections, 
                'List Message Title', // Title
                'This is the list message footer.' // Footer
            );
            await client.sendMessage(message.from, list);
        } catch (error) {
            console.error('Error sending list message:', error);
            await message.reply('Failed to send list message. This feature may not be supported on your WhatsApp version or by the library.');
        }
    }
};