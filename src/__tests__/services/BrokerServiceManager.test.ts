import BrokerServiceManager from '../../services/BrokerServiceManager';
import Broker from '../../brokers/Broker';
import ConfigLoader from '../../core/ConfigLoader';


describe('BrokerServiceManager', () => {

  beforeAll(() => {
    process.env.KRAKEN_COLLECTOR_HOST = '127.0.0.1';
    process.env.KRAKEN_COLLECTOR_PORT = '50055';
    process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
  });

  it('should start successfully as Broker Serivce', async () => {
    try {
      new ConfigLoader(process.env);
      const manager = new BrokerServiceManager();
      manager.broker = [new Broker()];
      await manager.start();
      await manager.stop();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

  it('should throw an error because no broker set', async () => {
    try {
      new ConfigLoader(process.env);
      const manager = new BrokerServiceManager();
      await manager.start();
      await manager.stop();
    } catch (e) {
      expect(e).toBe("Broker Service no Brokers set. You have to set the Broker greater than 1.");
    }
  });

});