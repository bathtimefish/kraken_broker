import BrokerService from '../../services/BrokerService';
import ConfigLoader from '../../core/ConfigLoader';

describe('BrokerService', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should be started successfully as the Broker Service', async () => {
    try {
      new ConfigLoader(process.env);
      const service = new BrokerService();
      await service.setup();
      await service.start();
      await service.stop();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should throw an error because no Broker assigned', async () => {
    try {
      new ConfigLoader(process.env);
      const service = new BrokerService();
      await service.start();
      await service.stop();
    } catch (e) {
      expect(e).toBe("Broker Service No any Broker assined. KRAKEN couldn't start the Broker Service.");
    }
  });

});