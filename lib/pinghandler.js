const chalk = require('chalk');
const { performance } = require('perf_hooks');

module.exports = async (client, message) => {
    const startTime = performance.now();
    
    try {
        // First send the initial ping message
        const pingMessage = await message.reply('🏓 Pong!');
        const endTime = performance.now();
        const responseTime = (endTime - startTime).toFixed(2);

        // Get basic connection info safely
        let connectionStatus = 'Unknown';
        let platformInfo = 'Unknown';
        
        if (client.info) {
            connectionStatus = client.info.connected ? 'Connected ✅' : 'Disconnected ❌';
            platformInfo = client.info.platform || 'Unknown';
        }

        // Prepare the final message
        const results = `
⏱️ *Response Time:* ${responseTime}ms
📶 *Connection Status:* ${connectionStatus}
💻 *Platform:* ${platformInfo}
🕒 *Measured At:* ${new Date().toLocaleTimeString()}
        `.trim();

        // Edit the original message with the results
        await pingMessage.edit(results);
        
        console.log(chalk.green(
            `[PING] ${message.from} | ` +
            `Response: ${responseTime}ms | ` +
            `Status: ${connectionStatus}`
        ));

    } catch (error) {
        const failTime = (performance.now() - startTime).toFixed(2);
        console.error(chalk.red(
            `[PING FAIL] ${message.from} | ` +
            `After ${failTime}ms | ` +
            `Error: ${error.message}`
        ));
        
        try {
            await message.reply(
                '❌ Ping failed!\n' +
                `Error: ${error.message}\n` +
                `Timeout: ${failTime}ms`
            );
        } catch (secondaryError) {
            console.error(chalk.red(
                `[CRITICAL] Failed to send error message: ${secondaryError.message}`
            ));
        }
    }
};

//kinda works