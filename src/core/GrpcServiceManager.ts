import { EventEmitter, EventPort } from './events';
import grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import { KrakenGrpcRequest, KrakenGrpcResponse } from '../types/grpc';
import logger from './logger';

class GrpcServiceManager {
  _SERVICE_NAME = 'GRPC Service Mamager';
  _PROTO_PATH = './proto/kraken.proto';
  _PROTODEF;
  _SERVER;
  _CLIENT;
  _CONFIG: KrakenConfig.grpc;
  _EMITTER;
  _EVENTPORT: any;
  constructor(config: KrakenConfig.grpc) {
    this._EMITTER = new EventEmitter();
    this._EVENTPORT = new EventPort(config.message.from, this._EMITTER);
    this._CONFIG = config;
    const packageDefinition = protoLoader.loadSync(
      this._PROTO_PATH,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });
    this._PROTODEF = grpc.loadPackageDefinition(packageDefinition).kraken;
    this._SERVER = this.createServer();
    this._CLIENT = this.createClient();
  }
  private setServerMethod(): any {
    const method = (call: grpc.ServerUnaryCall<KrakenGrpcRequest>,
                          callback: grpc.sendUnaryData<KrakenGrpcResponse>) => {
      try {
        this._EMITTER.emit(this._EVENTPORT, call.request.kind, call.request.provider, JSON.parse(call.request.payload));
        const res: KrakenGrpcResponse = {
          status: 1,
        };
        callback(null, res);
      } catch (e) {
        logger.error(`${this._SERVICE_NAME} Server has an error: ${e as string}`);
        const res: KrakenGrpcResponse = {
          status: 0,
        };
        callback(null, res);
      }
    };
    return method;
  }
  private createServer(): grpc.Server {
    const server: grpc.Server = new grpc.Server();
    const methods = { send: this.setServerMethod() };
    const def: any = this._PROTODEF;  // cast as any once for avoiding types error.
    server.addService(def.KrakenMessage.service, methods);
    logger.log(`${this._SERVICE_NAME} created GRPC Message Server for Kraken`);
    return server;
  }
  private startServer(): void {
    const host = `${this._CONFIG.host}:${this._CONFIG.port}`;
    this._SERVER.bind(host, grpc.ServerCredentials.createInsecure());
    this._SERVER.start();
    logger.log(`${this._SERVICE_NAME} Server started on ${this._CONFIG.host} listening port ${this._CONFIG.port}`);
  }
  private stopServer(): void {
    this._SERVER.forceShutdown();
  }
  get server() {
    const event = this._EVENTPORT;
    return {
      event,
      start: () => {
        this.startServer();
      },
      stop: () => {
        this.stopServer();
      },
    };
  }
  private createClient(): grpc.Client {
    const def: any = this._PROTODEF;  // cast as any once for avoiding types error.
    const host = `${this._CONFIG.host}:${this._CONFIG.port}`;
    const client: grpc.Client = new def.KrakenMessage(host, grpc.credentials.createInsecure());
    logger.log(`${this._SERVICE_NAME} Client created the request will be sent to port ${this._CONFIG.port}`);
    return client;
  }
  private async clientSend(req: KrakenGrpcRequest): Promise<any> {
    const client: any = this._CLIENT;
    return new Promise((resolve, reject) => {
      client.send(req, (err: any, res: any) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }
  get client() {
    return {
      /* eslint @typescript-eslint/no-unsafe-return: 0 */
      send: async (kind: string, provider: string, payload: any): Promise<any> => {
        if (!kind || !provider || !payload) throw 'Illigal parameter';
        const p = JSON.stringify(payload);
        const req: KrakenGrpcRequest = {
          kind,
          provider,
          payload: p,
        };
        const res = await this.clientSend(req);
        return res;
      },
    };
  }
}

export default GrpcServiceManager;
