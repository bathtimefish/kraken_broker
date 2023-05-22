import ConfigLoader from '../../core/ConfigLoader';

describe('ConfigLoader', () => {
    
    beforeAll(() => {
      process.env.KRAKEN_DEBUG = '3';
      process.env.KRAKEN_GRPC_HOST = '8.8.8.8';
      process.env.KRAKEN_GRPC_PORT = '51055';
      process.env.KRAKEN_ADAPTOR_CONFIG_PATH = './assets/config/broker-sample.yaml';
    });

  it('should convert values collectly for Core config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken).toHaveProperty('config');
      expect(global.kraken.config).toHaveProperty('core');
      expect(global.kraken.config.core).toHaveProperty('debug');
      expect(global.kraken.config.core.debug).toBe(3);
  });

  it('should convert values collectly for GRPC config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config).toHaveProperty('grpc');
      expect(global.kraken.config.grpc).toHaveProperty('host');
      expect(global.kraken.config.grpc.host).toBe('8.8.8.8');
      expect(global.kraken.config.grpc).toHaveProperty('port');
      expect(global.kraken.config.grpc.port).toBe(51055);
  });

  it('should convert values collectly for InfluxDB adaptor config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('influxdb');
      expect(global.kraken.config.adaptor.influxdb).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.influxdb.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.influxdb.host).toBe('http://localhost');
      expect(global.kraken.config.adaptor.influxdb.port).toBe(8086);
      expect(global.kraken.config.adaptor.influxdb.bucket).toBe('mydb');
  });

  it('should convert values collectly for Redis config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('redis');
      expect(global.kraken.config.adaptor.redis).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.redis.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.redis.host).toBe('127.0.0.1');
      expect(global.kraken.config.adaptor.redis.port).toBe(6379);
  });

  it('should convert values collectly for MongoDB adaptor config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('mongodb');
      expect(global.kraken.config.adaptor.mongodb).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.mongodb.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.mongodb.host).toBe('mongodb://localhost');
      expect(global.kraken.config.adaptor.mongodb.port).toBe(27017);
  });

  it('should convert values collectly for MySQL adaptor config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('mysql');
      expect(global.kraken.config.adaptor.mysql).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.mysql.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.mysql.host).toBe('127.0.0.1');
      expect(global.kraken.config.adaptor.mysql.port).toBe(3306);
  });

  it('should convert values collectly for Slack adaptor config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('slack');
      expect(global.kraken.config.adaptor.slack).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.slack.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.slack.url).not.toBeNull();
  });

  it('should convert values collectly for Webhook adaptor config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('webhook');
      expect(global.kraken.config.adaptor.webhook).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.webhook.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.webhook.targets).toHaveLength(2);
  });

  it('should convert values collectly for WebSocket adaptor config', () => {
      new ConfigLoader(process.env);
      expect(global.kraken.config.adaptor).toHaveProperty('websocket');
      expect(global.kraken.config.adaptor.websocket).toHaveProperty('enable');
      expect(global.kraken.config.adaptor.websocket.enable).toBeTruthy();
      expect(global.kraken.config.adaptor.websocket.port).toBe(6006);
  });

});