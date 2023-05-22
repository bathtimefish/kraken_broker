import ConfigLoader from '../../core/ConfigLoader';
import Slack from '../../adaptors/Slack';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be the adaptor has valid methods', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new Slack();
      expect(adaptor).toHaveProperty('post');
      expect(typeof adaptor.post).toBe('function');
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be rise an exception if the adaptor be not enable', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.slack.enable = false;
      new Slack();
    } catch (e) {
      expect(e).toMatch(/Adaptor was not installed or enabled./);
    }
  });

  it('should be rise an exception if the adaptor has no host name', async () => {
    try {
      new ConfigLoader(process.env);
      global.kraken.config.adaptor.slack.url = '';
      new Slack();
    } catch (e) {
      expect(e).toMatch(/Adaptor config `url` was empty./);
    }
  });

  // This test skipped until the nock module setup finished.
  it.skip('should be post a message successfully', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new Slack();
      const payload: KrakenAdaptor.SlackPayload = {
        channel: '#random',
        username: 'krakenbot',
        text: 'this message was posted from Kraken Broker test',
      };
      await expect(adaptor.post(payload)).resolves.toBeTruthy();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should be receive false because of payload was invalid', async () => {
    try {
      new ConfigLoader(process.env);
      const adaptor = new Slack();
      const payload: KrakenAdaptor.SlackPayload = {
        channel: '#invalidchannel',
        username: 'krakenbot',
        text: 'this message was posted from Kraken Broker test',
      };
      await expect(adaptor.post(payload)).resolves.toBeFalsy();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

});