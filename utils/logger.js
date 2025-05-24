class Logger {
    constructor(name) {
        this.name = name;
        this.logLevel = process.env.LOG_LEVEL || 'info';
        this.colors = {
            error: '\x1b[31m', // red
            warn: '\x1b[33m',  // yellow
            info: '\x1b[36m',  // cyan
            debug: '\x1b[32m', // green
            reset: '\x1b[0m'   // reset color
        };
        this.levels = ['error', 'warn', 'info', 'debug'];
    }

    log(level, message) {
        if (this.levels.indexOf(level) > this.levels.indexOf(this.logLevel)) return;
        
        const timestamp = new Date().toISOString();
        const color = this.colors[level] || '';
        const levelStr = level.toUpperCase().padEnd(5);
        
        console.log(
            `[${timestamp}] ${color}[${levelStr}]${this.colors.reset} ` +
            `[${this.name}] ${message}`
        );
    }

    error(message) { this.log('error', message); }
    warn(message) { this.log('warn', message); }
    info(message) { this.log('info', message); }
    debug(message) { this.log('debug', message); }
}

module.exports = Logger;