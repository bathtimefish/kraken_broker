import moment from 'moment';

const getDateString = (): string => {
  const d = new Date();
  const dt = moment(d).format('YYYY-MM-DD hh:mm:ss');
  return dt;
};

const logger = {
  log: (message: string): void => {
    const cfg = global.kraken.config.core;
    if (cfg.debug > 1) {
      console.log(`${getDateString()} | [LOG]   | ${message}`);
    }
  },
  info: (message: string): void => {
    const cfg = global.kraken.config.core;
    if (cfg.debug) {
      console.info(`${getDateString()} | [INFO]  | ${message}`);
    }
  },
  warn: (message: string): void => {
    const cfg = global.kraken.config.core;
    if (cfg.debug) {
      console.warn(`${getDateString()} | [WARN]  | ${message}`);
    }
  },
  error: (message: string): void => {
    const cfg = global.kraken.config.core;
    if (cfg.debug) {
      console.error(`${getDateString()} | [ERROR] | ${message}`);
    }
  },
};

export default logger;
