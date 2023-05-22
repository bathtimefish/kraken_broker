import ConfigLoader from '../../core/ConfigLoader';
import InfluxDb from '../../adaptors/InfluxDb';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new InfluxDb();
      expect(adaptor).toHaveProperty('writeApi');
      expect(typeof adaptor.writeApi).toBe('object');
      expect(adaptor).toHaveProperty('queryApi');
      expect(typeof adaptor.queryApi).toBe('object');
      expect(adaptor).toHaveProperty('Point');
      expect(typeof adaptor.Point).toBe('function');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.influxdb.enable = false;
      new InfluxDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has no host name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.influxdb.host = '';
      new InfluxDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `host` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has invalid port number', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.influxdb.port = 0;
      new InfluxDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `port` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has no access token', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.influxdb.token = '';
      new InfluxDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `token` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has no organization name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.influxdb.organization = '';
      new InfluxDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `organization` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has no bucket name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.influxdb.bucket = '';
      new InfluxDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `bucket` was empty./);
    }
  });

});