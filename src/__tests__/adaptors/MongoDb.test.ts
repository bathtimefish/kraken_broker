import ConfigLoader from '../../core/ConfigLoader';
import MongoDb from '../../adaptors/MongoDb';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new MongoDb();
      expect(adaptor).toHaveProperty('instance');
      expect(typeof adaptor.instance).toBe('function');
      expect(adaptor).toHaveProperty('ObjectID');
      expect(typeof adaptor.ObjectID).toBe('function');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  // This test will be exec when Mongo container has run. 
  it.skip('should be successfully to get adaptor instance', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new MongoDb();
      expect(adaptor).toHaveProperty('instance');
      expect(typeof adaptor.instance).toBe('function');
      const mongo = await adaptor.instance();
      if (mongo) {
        expect(typeof mongo.collection).toBe('function');
      }
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mongodb.enable = false;
      new MongoDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has no host name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mongodb.host = '';
      new MongoDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `host` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has invalid port number', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mongodb.port = 0;
      new MongoDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `port` was empty./);
    }
  });

  it('should be rise an exception if the adaptor has no database name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.mongodb.database = '';
      new MongoDb();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `database` was empty./);
    }
  });

});