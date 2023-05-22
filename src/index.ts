import ConfigLoader from './core/ConfigLoader';
import logger from './core/logger';
import BrokerService from './services/BrokerService';

/* istanbul ignore next */
const main = (): void => {
  try {
    new ConfigLoader(process.env);
    const config = global.kraken.config;
    logger.info('KRAKEN - Highlevel IoT data router - boot squence start.');
    if (config.core.debug) logger.info('KRAKEN is running as DEBUG MODE.');
    const service = new BrokerService();
    service.setup();
    service.start();
  } catch (e: any) {
    throw new Error(e);
  }
};

// !!! These are test env values !!!
// process.env.KRAKEN_DEBUG = '3';
// process.env.KRAKEN_GRPC_HOST = '0.0.0.0';
// process.env.KRAKEN_GRPC_PORT = '50055';
// process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config-yaml/sample-config.yaml';
/* istanbul ignore next */
main();
