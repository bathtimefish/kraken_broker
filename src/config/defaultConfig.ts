// Core
export const core: KrakenConfig.core = {
  debug: 0,
};

// GRPC
export const grpc: KrakenConfig.grpc = {
  host: '0.0.0.0',
  port: 50055,
  message: {
    from: 'kraken.collector.message.from',
    to: 'kraken.collector.message.to',
  },
};

// Adaptors
export const influxdb: KrakenConfig.influxdb = {
  enable: false,
  type: 'influxdb',
  name: 'InfluxDB',
  host: 'http://localhost',
  port: 8086,
  token: '',
  organization: 'default',
  bucket: '',
};

export const redis: KrakenConfig.redis = {
  enable: false,
  type: 'redis',
  name: 'Redis',
  host: '127.0.0.1',
  port: 6379,
  username: '',
  password: '',
  keyPrefix: 'KRAKEN',
  separator: '#',
};

export const mongodb: KrakenConfig.mongodb = {
  enable: false,
  type: 'mongodb',
  name: 'MongoDB',
  host: 'mongodb://localhost',
  port: 27017,
  username: '',
  password: '',
  database: '',
};

export const mysql: KrakenConfig.mysql = {
  enable: false,
  type: 'mysql',
  name: 'MySQL',
  host: '127.0.0.1',
  port: 3306,
  username: '',
  password: '',
  database: '',
};

export const tinkermode: KrakenConfig.tinkermode = {
  enable: false,
  type: 'tinkermode',
  name: 'Tinkermode',
  baseUrl: 'https://api.tinkermode.com',
  deviceId: 0,
  deviceApikey: '',
};

export const cosmosdb: KrakenConfig.cosmosdb = {
  enable: false,
  type: 'cosmosdb',
  name: 'Azure CosmosDB',
  endpoint: '',
  key: '',
  database: '',
};

export const slack: KrakenConfig.slack = {
  enable: false,
  type: 'slack',
  name: 'Slack Incoming Webhook',
  url: '',
};

export const webhook: KrakenConfig.webhook = {
  enable: false,
  type: 'webhook',
  name: 'Webhook push notification API',
  targets: [],
};

export const websocket: KrakenConfig.websocket = {
  enable: false,
  type: 'websocket',
  name: 'WebSocket push message API',
  port: 6006,
};

export default {
  core,
  grpc,
  adaptor: {
    influxdb,
    redis,
    mongodb,
    mysql,
    tinkermode,
    cosmosdb,
    slack,
    webhook,
    websocket,
  },
};
