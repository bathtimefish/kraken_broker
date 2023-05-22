declare namespace KrakenAdaptorYaml {
  interface adaptor {
    enable: boolean,
    type: string,
    name: string,
  }
  interface influxdb extends KrakenAdaptorYaml.adaptor {
    type: 'influxdb',
    host: string,
    port: number,
    token: string,
    organization: string,
    bucket: string,
    username?: string,
    password?: string,
  }
  interface redis extends KrakenAdaptorYaml.adaptor {
    type: 'redis',
    host: string,
    port: number,
    username?: string,
    password?: string,
    keyPrefix: string,
    separator?: string,
  }
  interface mongodb extends KrakenAdaptorYaml.adaptor {
    type: 'mongodb',
    host: string,
    port: number,
    username: string,
    password?: string,
    database: string,
  }
  interface mysql extends KrakenAdaptorYaml.adaptor {
    type: 'mysql',
    host: string,
    port: number,
    username: string,
    password?: string,
    database: string,
  }
  interface tinkermode extends KrakenAdaptorYaml.adaptor {
    type: 'tinkermode',
    deviceId: number,
    deviceApikey: string,
    baseUrl: string,
  }
  interface cosmosdb extends KrakenAdaptorYaml.adaptor {
    type: 'cosmosdb';
    endpoint: string;
    key: string;
    database: string;
  }
  interface slack extends KrakenAdaptorYaml.adaptor {
    type: 'slack',
    url: string,
  }
  interface webhookTarget extends KrakenAdaptorYaml.adaptor {
    name: string,
    url: string,
  }
  interface webhook extends KrakenAdaptorYaml.adaptor {
    type: 'webhook',
    targets: KrakenAdaptorYaml.webhookTarget[],
  }
  interface websocket extends KrakenAdaptorYaml.adaptor {
    type: 'websocket',
    port: number,
  }
}

declare namespace KrakenConfig {
  interface config {
    core: KrakenConfig.core;
    grpc: KrakenConfig.grpc;
    adaptor: {
      influxdb: KrakenConfig.influxdb;
      redis: KrakenConfig.redis;
      mongodb: KrakenConfig.mongodb;
      mysql: KrakenConfig.mysql;
      tinkermode: KrakenConfig.tinkermode;
      slack: KrakenConfig.slack;
      webhook: KrakenConfig.webhook;
      websocket: KrakenConfig.websocket;
      cosmosdb: KrakenConfig.cosmosdb;
    };
  }
  interface core {
    debug: number,
  }
  interface grpc {
    host: string,
    port: number,
    message: {
      from: string,
      to: string,
    }
  }
  interface adaptor extends KrakenAdaptorYaml.adaptor { }
  interface influxdb extends KrakenAdaptorYaml.influxdb { }
  interface redis extends KrakenAdaptorYaml.redis { }
  interface mongodb extends KrakenAdaptorYaml.mongodb { }
  interface mysql extends KrakenAdaptorYaml.mysql { }
  interface tinkermode extends KrakenAdaptorYaml.tinkermode { }
  interface cosmosdb extends KrakenAdaptorYaml.cosmosdb { }
  interface slack extends KrakenAdaptorYaml.slack { }
  interface webhookTarget extends KrakenAdaptorYaml.webhookTarget { }
  interface webhook extends KrakenAdaptorYaml.webhook { }
  interface websocket extends KrakenAdaptorYaml.websocket { }
}

namespace KrakenAdaptor {
  interface SlackPayload {
    channel: string,
    username: string,
    text: string,
  }
  interface WebhookPayload {
    target: string,
    body: any;
  }
  interface TMEvent {
    eventType: string,
    eventData: any,
  }
  interface TMTimeSeriesData {
    timestamp: string,
    seriesId: string,
    value: number,
  }
  interface TMCollectionRecord {
    timestamp: string,
    values: number[],
    tags: string[],
  }
  interface TMTimeseriesEvent extends TMEvent {
    eventType: 'timeSeriesEvent',
    eventData: {
      timeSeriesData: TMTimeSeriesData[],
    }
  }
  interface TMCollectionEvent extends TMEvent {
    eventType: 'collectionEvent',
    eventData: {
      collectionId: string,
      valueNames: string[],
      tagNames: string[],
      records: TMCollectionRecord[],
    }
  }
}
