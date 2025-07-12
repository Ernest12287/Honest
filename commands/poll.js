// commands/poll.js
const pollHandler = require('../lib/pollHandler');

module.exports = {
    name: 'poll',
    description: 'Creates a poll in the group. Usage: !poll "Question" "Option1" "Option2" ...',
    category: 'Group',
    groupOnly: true,
    
    async execute(client, message, args, commands) {
        await pollHandler(client, message); 
    }
};