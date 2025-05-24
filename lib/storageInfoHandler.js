const chalk = require('chalk');
const fs = require('fs');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const statfs = promisify(require('fs').statfs || promisify(require('fs').statfsSync)); // Fallback for Windows

module.exports = async (client, message) => {
    try {
        // Helper function to format bytes
        const formatBytes = (bytes, decimals = 2) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };

        // Try to get filesystem stats (works on Linux/Mac)
        let totalBytes, freeBytes;
        try {
            const stats = await statfs('/');
            totalBytes = stats.blocks * stats.bsize;
            freeBytes = stats.bfree * stats.bsize;
        } catch (fsError) {
            // Fallback for Windows or if statfs fails
            const pathStats = await stat('./');
            totalBytes = 100 * 1024 * 1024; // 100MB fallback
            freeBytes = totalBytes - pathStats.size;
        }

        const usedBytes = totalBytes - freeBytes;
        const usedPercentage = (usedBytes / totalBytes * 100).toFixed(1);
        
        // Create storage bar visualization
        const barLength = 20;
        const usedBar = '█'.repeat(Math.round(barLength * usedPercentage / 100));
        const freeBar = '░'.repeat(barLength - usedBar.length);
        
        // Format the response
        const storageInfo = `
📊 ${chalk.bold.hex('#FFA500')('ERNEST STORAGE STATUS')}

${chalk.bold('Storage Usage:')}
${usedBar}${freeBar} ${usedPercentage}%

${chalk.blue('▸ Used:')} ${formatBytes(usedBytes)}
${chalk.green('▸ Free:')} ${formatBytes(freeBytes)}
${chalk.yellow('▸ Total:')} ${formatBytes(totalBytes)}

${chalk.gray('Last updated: ' + new Date().toLocaleString())}
        `;

        await message.reply(storageInfo);
        console.log(chalk.hex('#FFA500')(`[STORAGE] ${usedPercentage}% used (${formatBytes(usedBytes)}/${formatBytes(totalBytes)})`));
    } catch (error) {
        console.error(chalk.red(`[STORAGE ERROR] ${error.message}`));
        await message.reply(`
❌ ${chalk.red.bold('Storage Check Failed')}
${chalk.yellow('Reason:')} ${error.message}
        `);
    }
};

//works