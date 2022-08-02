export class LogManager {
  debug!: boolean;
  logger: {
    [key: string]: (...args: any[]) => void;
  } = {
    log: () => {},
  };

  setupDebugger(debug: boolean) {
    this.debug = debug;
    if (debug) {
      this.logger.log = console.log.bind(window.console);
    }
  }
}

export const logManager = new LogManager();
export const logger = logManager.logger;
