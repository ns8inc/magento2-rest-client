import { createLogger, format, transports } from 'winston';
import * as StackTracey from 'stacktracey';
const { combine, timestamp, label, prettyPrint, json, colorize, errors } = format;

export class Logger {
  public logger: any;
  constructor() {
    this.logger = createLogger({
      format: combine(
        label({ label: 'Magento' }),
        timestamp(),
        prettyPrint({
          colorize: true
        }),
        json(),
        colorize({
          colors: {info: 'blue', error: 'red'}
        })
      ),
      transports: [
        new transports.Console({
          level: 'debug',
          handleExceptions: true
        }),
        new transports.File({
          filename: 'request.log',
        }),
        new transports.File({
          filename: 'error.log',
          level: 'error'
        })
      ],
      exitOnError: false
    });
    this.logger.info('Magento 2 REST Client logging initialized.');
  }
  public info(message): void {
    this.logger.info(message);
  }
  public error(message, err): void {
    this.logger.error(message);
    if (err) {
      const errorsFormat = errors({stack: false});
      if (!err.stack) {
        err.stack = new StackTracey().pretty;
      }
      const info = errorsFormat.transform(err, err.stack);
      this.logger.error(info);
    }
  }
}