import ConfigLoader from '../../core/ConfigLoader';
import Webhook from '../../adaptors/Webhook';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new Webhook();
      expect(adaptor).toHaveProperty('post');
      expect(typeof adaptor.post).toBe('function');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.webhook.enable = false;
      new Webhook();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has no target', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.webhook.targets = [];
      new Webhook();
    } catch (e) {
      expect(e).toMatch(/Adaptor must have 1 or more target./);
    }
  });

  // This test skipped until the nock module setup finished.
  it.skip('should be post a message successfully', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new Webhook();
      const payload: KrakenAdaptor.WebhookPayload = {
        target: 'webhook1',
        body: 'this message was posted from Kraken Broker test',
      };
      await expect(adaptor.post(payload)).resolves.toBeTruthy();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

});