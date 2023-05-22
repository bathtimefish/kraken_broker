import BrokerServiceManager from './BrokerServiceManager';
import logger from '../core/logger';
// import your custom brokers below
// import ExampleBroker from '../brokers/ExampleBroker';
import Broker from '../brokers/Broker';

class BrokerService {
  _SERVICE_NAME = 'Broker Service';
  _BROKERS: any[];
  _BROKER_COUNT = 0;
  _MANAGER;
  constructor() {
    // !!! set your custom brokers berrow !!!
    this._BROKERS = [
      new Broker(),
      // new ExampleBroker(),
    ];
    const brokerMgr = new BrokerServiceManager();
    this._MANAGER = brokerMgr;
  }
  public setup(): void {
    this._MANAGER.broker = this._BROKERS;
    this._BROKER_COUNT = this._MANAGER.brokerCount;
  }
  public start(): void {
    if (this._BROKER_COUNT < 1) {
      throw `${this._SERVICE_NAME} No any Broker assined. KRAKEN couldn't start the Broker Service.`;
    }
    this._MANAGER.start();
    logger.info(`${this._SERVICE_NAME} started.`);
  }
  public stop(): void {
    logger.info(`${this._SERVICE_NAME} will stop.`);
    this._MANAGER.stop();
  }
}

export default BrokerService;
