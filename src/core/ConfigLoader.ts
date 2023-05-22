import fs from 'fs';
import jsYaml from 'js-yaml';
import defaultConfig, {
  influxdb,
  redis,
  mongodb,
  mysql,
  tinkermode,
  cosmosdb,
  slack,
  webhook,
  websocket,
} from '../config/defaultConfig';

const PROPS = [
  'KRAKEN_DEBUG',
  'KRAKEN_GRPC_HOST',
  'KRAKEN_GRPC_PORT',
  'KRAKEN_ADAPTOR_CONFIG_PATH',
];

class ConfigLoader {
  private config: KrakenConfig.config;
  constructor(env: NodeJS.ProcessEnv) {
    const kenvs = this.getKrakenEnvs(env);
    this.config = defaultConfig as unknown as KrakenConfig.config;
    this.setConfig(kenvs);
    global.kraken = { config: this.config };
  }
  private isJson(v: string) {
    try {
      JSON.parse(v);
    } catch (e) {
      return false;
    }
    return true;
  }
  private isIpAddress(v: string) {
    // Pattern of IP Address validation
    // https://www.w3resource.com/javascript/form/ip-address-validation.php
    const ptn = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (v.match(ptn)) {
      return true;
    }
    return false;
  }
  private getKrakenEnvs(env: NodeJS.ProcessEnv): any {
    const r: any = {};
    for (const key in env) {
      const p = PROPS.find(prop => prop === key);
      if (!p) continue;
      const value = env[key] as string;
      if (this.isJson(value)) {
        // convert to object if the string is stringified json
        r[p] = JSON.parse(value);
        continue;
      }
      if (this.isIpAddress(value)) {
        r[p] = value;
        continue;
      }
      if (!/\D/.test(value)) {
        // convert integer string to number object
        r[p] = parseInt(value, 10);
        continue;
      }
      if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        // convert true/false string to boolean object
        r[p] = value.toLowerCase() === 'true';
        continue;
      }
      r[p] = value;
    }
    return r;
  }
  private setConfig(kenvs: any): void {
    for (const prop in kenvs) {
      switch (prop) {
      case 'KRAKEN_DEBUG':
        this.config.core.debug = kenvs[prop];
        break;
      case 'KRAKEN_GRPC_HOST':
        this.config.grpc.host = kenvs[prop];
        break;
      case 'KRAKEN_GRPC_PORT':
        this.config.grpc.port = kenvs[prop];
        break;
      case 'KRAKEN_ADAPTOR_CONFIG_PATH':
        this.setAdaptorConfigFromYaml(kenvs[prop]);
        break;
      default:
      }
    }
  }
  private setAdaptorConfigFromYaml(path: string): void {
    const obj: any = jsYaml.load(fs.readFileSync(path, 'utf8'));
    if (typeof obj !== 'object') throw 'Failed to load adaptor config file: file does not be object.';
    for (const key in obj as object) {
      switch (key) {
      case 'influxdb':
        this.setInfluxdbAdaptor(obj[key]);
        break;
      case 'redis':
        this.setRedisAdaptor(obj[key]);
        break;
      case 'mongodb':
        this.setMongodbAdaptor(obj[key]);
        break;
      case 'mysql':
        this.setMysqlAdaptor(obj[key]);
        break;
      case 'tinkermode':
        this.setTinkermodeAdaptor(obj[key]);
        break;
      case 'cosmosdb':
        this.setCosmosdbAdaptor(obj[key]);
        break;
      case 'slack':
        this.setSlackAdaptor(obj[key]);
        break;
      case 'webhook':
        this.setWebhookAdaptor(obj[key]);
        break;
      case 'websocket':
        this.setWebsocketAdaptor(obj[key]);
        break;
      default:
      }
    }
  }
  private setInfluxdbAdaptor(config: KrakenConfig.influxdb): void {
    const adaptor: KrakenConfig.influxdb = influxdb;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : influxdb.name;
    adaptor.host = config.host ? config.host : influxdb.host;
    adaptor.port = config.port ? config.port : influxdb.port;
    adaptor.token = config.token ? config.token : influxdb.token;
    adaptor.organization = config.organization ? config.organization : influxdb.organization;
    adaptor.bucket = config.bucket ? config.bucket : influxdb.bucket;
    adaptor.username = config.username ? config.username : influxdb.username;
    adaptor.password = config.password ? config.password : influxdb.password;
    this.config.adaptor.influxdb = adaptor;
  }
  private setRedisAdaptor(config: KrakenConfig.redis) {
    const adaptor: KrakenConfig.redis = redis;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : redis.name;
    adaptor.host = config.host ? config.host : redis.host;
    adaptor.port = config.port ? config.port : redis.port;
    adaptor.username = config.username ? config.username : redis.username;
    adaptor.password = config.password ? config.password : redis.password;
    adaptor.keyPrefix = config.keyPrefix ? config.keyPrefix : redis.keyPrefix;
    adaptor.separator = config.separator ? config.separator : redis.separator;
    this.config.adaptor.redis = adaptor;
  }
  private setMongodbAdaptor(config: KrakenConfig.mongodb) {
    const adaptor: KrakenConfig.mongodb = mongodb;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : mongodb.name;
    adaptor.host = config.host ? config.host : mongodb.host;
    adaptor.port = config.port ? config.port : mongodb.port;
    adaptor.username = config.username ? config.username : mongodb.username;
    adaptor.password = config.password ? config.password : mongodb.password;
    adaptor.database = config.database ? config.database : mongodb.database;
    this.config.adaptor.mongodb = adaptor;
  }
  private setMysqlAdaptor(config: KrakenConfig.mysql) {
    const adaptor: KrakenConfig.mysql = mysql;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : mysql.name;
    adaptor.host = config.host ? config.host : mysql.host;
    adaptor.port = config.port ? config.port : mysql.port;
    adaptor.username = config.username ? config.username : mysql.username;
    adaptor.password = config.password ? config.password : mysql.password;
    adaptor.database = config.database ? config.database : mysql.database;
    this.config.adaptor.mysql = adaptor;
  }
  private setTinkermodeAdaptor(config: KrakenConfig.tinkermode) {
    const adaptor: KrakenConfig.tinkermode = tinkermode;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : tinkermode.name;
    adaptor.baseUrl = config.baseUrl ? config.baseUrl : tinkermode.baseUrl;
    adaptor.deviceId = config.deviceId ? config.deviceId : tinkermode.deviceId;
    adaptor.deviceApikey = config.deviceApikey ? config.deviceApikey : tinkermode.deviceApikey;
    if (!adaptor.baseUrl || adaptor.baseUrl === '') throw 'Tinkermode adaptor baseUrl is invalid.';
    if (adaptor.deviceId < 1) throw `Tinkermode adaptor must have valid device ID. Current device ID is ${adaptor.deviceId}.`;
    if (!adaptor.deviceApikey || adaptor.deviceApikey === '') throw 'Tinkermode adaptor deviceApikey is invalid.';
    this.config.adaptor.tinkermode = adaptor;
  }
  private setCosmosdbAdaptor(config: KrakenConfig.cosmosdb) {
    const adaptor: KrakenConfig.cosmosdb = cosmosdb;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : cosmosdb.name;
    adaptor.endpoint = config.endpoint ? config.endpoint : cosmosdb.endpoint;
    adaptor.key = config.key ? config.key : cosmosdb.key;
    adaptor.database = config.database ? config.database : cosmosdb.database;
    this.config.adaptor.cosmosdb = adaptor;
  }
  private setSlackAdaptor(config: KrakenConfig.slack) {
    const adaptor: KrakenConfig.slack = config;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : slack.name;
    adaptor.url = config.url ? config.url : slack.url;
    this.config.adaptor.slack = adaptor;
  }
  private setWebhookAdaptor(config: KrakenConfig.webhook) {
    const adaptor: KrakenConfig.webhook = config;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : webhook.name;
    if (config.targets.length < 1) throw 'Webhook adaptor must have `target` greather then 1';
    adaptor.targets = config.targets ? config.targets : webhook.targets;
    this.config.adaptor.webhook = adaptor;
  }
  private setWebsocketAdaptor(config: KrakenConfig.websocket) {
    const adaptor: KrakenConfig.websocket = config;
    adaptor.enable = true;
    adaptor.name = config.name ? config.name : websocket.name;
    adaptor.port = config.port ? config.port : websocket.port;
    this.config.adaptor.websocket = adaptor;
  }
}

export default ConfigLoader;
