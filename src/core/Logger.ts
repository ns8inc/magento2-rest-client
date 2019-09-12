var winston = require('winston');

export default class Logger {
  public logger: any;
  constructor() {
    this.logger = new winston.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true
        })
      ],
      exitOnError: false
    });
    this.logger.info('Winston logging library initialized.');
  }
  info(message) {
    this.logger.info(message);
  }
  error(message) {
    this.logger.error(message);
  }
}