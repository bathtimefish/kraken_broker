import logger from '../core/logger';
import GrpcServiceManager from '../core/GrpcServiceManager';

class BrokerServiceManager {
  private _SERVICE_NAME = 'Broker Service';
  private _BROKER_COUNT = 0;
  private _CONFIG: KrakenConfig.config;
  private _GRPC_SERVER;
  constructor() {
    this._CONFIG = global.kraken.config;
    const grpc = new GrpcServiceManager(this._CONFIG.grpc);
    this._GRPC_SERVER = grpc.server;
  }
  public start(): void {
    if (!this._GRPC_SERVER) throw 'No set gRPC Server.';
    if (this._BROKER_COUNT < 1) throw `${this._SERVICE_NAME} no Brokers set. You have to set the Broker greater than 1.`;
    logger.info(`${this._SERVICE_NAME} gRPC server started.`);
    this._GRPC_SERVER.start();
  }
  public stop(): void {
    if (!this._GRPC_SERVER) throw 'No set gRPC Server.';
    logger.info(`${this._SERVICE_NAME} gRPC server will stop.`);
    this._GRPC_SERVER.stop();
  }
  get brokerCount() {
    return this._BROKER_COUNT;
  }
  set broker(brokers: any[]) {
    for (const broker of brokers) {
      if (typeof broker['onData'] === 'function') {
        this._GRPC_SERVER.event.on((type: string, provider: string, payload: any) => {
          broker.onData(type, provider, payload);
        });
        this._BROKER_COUNT = this._BROKER_COUNT + 1;
      } else {
        logger.error('A Broker has no method of `onData`. It could not assign to BrokerService');
      }
    }
  }
}

export default BrokerServiceManager;
