const os = require('os');
const process = require('process');

module.exports = {
    name: 'info',
    description: 'Shows bot information',
    async execute(message, args, client) {
        const chats = await client.getChats();
        const groups = chats.filter(chat => chat.isGroup);
        
        const uptime = formatUptime(process.uptime());
        const memoryUsage = process.memoryUsage();
        const memoryUsageMB = {
            rss: (memoryUsage.rss / 1024 / 1024).toFixed(2),
            heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2),
            heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
            external: (memoryUsage.external / 1024 / 1024).toFixed(2)
        };

        const infoText = `
🤖 *Bot Information*

🔹 *Name*: ${process.env.BOT_NAME || 'ErnestV1'}
🔹 *Prefix*: ${process.env.BOT_PREFIX || '!'}
🔹 *Mode*: ${process.env.BOT_MODE || 'private'}
🔹 *Version*: v1.0.0

📊 *Statistics*
🔸 *Uptime*: ${uptime}
🔸 *Groups*: ${groups.length}
🔸 *Memory Usage*: 
   - RSS: ${memoryUsageMB.rss} MB
   - Heap Total: ${memoryUsageMB.heapTotal} MB
   - Heap Used: ${memoryUsageMB.heapUsed} MB
   - External: ${memoryUsageMB.external} MB

🖥️ *System*
💻 *OS*: ${os.type()} ${os.release()}
⚙️ *Arch*: ${os.arch()}
🧠 *CPU*: ${os.cpus()[0].model}
        `.trim();

        message.reply(infoText);
    }
};

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}