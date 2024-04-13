import { LogLevel } from '@/types/logging-types';

export function generateLoggingFunction(
  moduleName: string,
  logLevel: LogLevel,
  currentLogLevel: LogLevel,
) {
  if (currentLogLevel >= logLevel) {
    let logKey = 'log';
    switch (logLevel) {
      case LogLevel.ERROR:
        logKey = 'error';
        break;
      case LogLevel.WARN:
        logKey = 'warn';
        break;
      default:
        break;
    }
    return console.log.bind(console, logKey, `[${moduleName}]`);
  } else {
    return () => {};
  }
}
export function createLogger(moduleName: string, logLevel: LogLevel) {
  return {
    error: generateLoggingFunction(moduleName, LogLevel.ERROR, logLevel),
    warn: generateLoggingFunction(moduleName, LogLevel.WARN, logLevel),
    info: generateLoggingFunction(moduleName, LogLevel.INFO, logLevel),
    debug: generateLoggingFunction(moduleName, LogLevel.DEBUG, logLevel),
  };
}
