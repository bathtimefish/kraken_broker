import ConfigLoader from '../../core/ConfigLoader';
import WebSocket from '../../adaptors/WebSocket';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new WebSocket();
      expect(adaptor).toHaveProperty('send');
      expect(typeof adaptor.send).toBe('function');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.websocket.enable = false;
      new WebSocket();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has invalid port number', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.websocket.port = 0;
      new WebSocket();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `port` was empty./);
    }
  });

  // This test skipped until the nock module setup finished.
  it.skip('should be post a message successfully', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new WebSocket();
      const payload: string = 'Hello Kraken websocket!';
      await expect(adaptor.send(payload)).resolves.toBeTruthy();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

});