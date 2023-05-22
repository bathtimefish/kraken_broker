import ConfigLoader from '../../core/ConfigLoader';
import Redis from '../../adaptors/Redis';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new Redis();
      expect(adaptor).toHaveProperty('instance');
      expect(typeof adaptor.instance).toBe('object');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.redis.enable = false;
      new Redis();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has no host name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.redis.host = '';
      new Redis();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `host` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has invalid port number', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.redis.port = 0;
      new Redis();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `port` was empty./);
    }
  });

});