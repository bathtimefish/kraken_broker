import ConfigLoader from '../../core/ConfigLoader';
import GrpcServiceManager from '../../core/GrpcServiceManager';

describe('GrpcServiceManager', () => {

  let config: KrakenConfig.grpc;

  beforeAll(() => {
    new ConfigLoader(process.env);
    config = global.kraken.config.grpc;
  });

  it('should be started and communicated successfully for the gRPC Service', async () => {
    const type_result = 'collector';
    const provider_result = 'mqtt';
    const payload_result = {greet: 'Hello Kraken!'};
    const mgr = new GrpcServiceManager(config);
    const server = mgr.server;
    expect(server).toHaveProperty('event');
    server.event.on((type: string, provider: string, payload: any) => {
      expect(type).toBe(type_result);
      expect(provider).toBe(provider_result);
      expect(payload).toStrictEqual(payload_result);
    });
    expect(server.start()).resolves.toBeUndefined();
    const client = mgr.client;
    const res = await client.send(type_result, provider_result, payload_result);
    expect(res).toStrictEqual({status: 1});
    expect(server.stop()).resolves.toBeUndefined();
  });

  it('gRPC Server should be respond the error status when rised an internal error.', async () => {
    const type_result = 'collector';
    const provider_result = 'mqtt';
    const payload_result = {greet: 'Hello Kraken!'};
    try {
      const mgr = new GrpcServiceManager(config);
      const server = mgr.server;
      expect(server).toHaveProperty('event');
      server.event.on((type: string, provider: string, payload: any) => {
        throw 'an error';  // A tric for rising an error.
      });
      await server.start();
      const client = mgr.client;
      const res = await client.send(type_result, provider_result, payload_result);
      expect(res.status).toBe(0);
      await server.stop();
    } catch (e) {
      expect(e).toBeUndefined();
    }
  });

});