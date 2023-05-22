import ConfigLoader from '../../core/ConfigLoader';
import MySql from '../../adaptors/MySql';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new MySql();
      expect(adaptor).toHaveProperty('instance');
      expect(typeof adaptor.instance).toBe('object');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mysql.enable = false;
      new MySql();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has no host name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mysql.host = '';
      new MySql();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `host` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has invalid port number', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mysql.port = 0;
      new MySql();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `port` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has no database name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mysql.database = '';
      new MySql();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `database` was empty./);
    }
  });

});