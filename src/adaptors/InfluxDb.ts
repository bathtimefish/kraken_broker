import { InfluxDB, Point } from '@influxdata/influxdb-client';

class InfluxDb {
  private _NAME: string;
  private _CONFIG: KrakenConfig.influxdb;
  private _DB: InfluxDB;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.influxdb;
    this._NAME = this._CONFIG.name;
    if (!this._CONFIG.enable) {
      throw `${this._NAME} Adaptor was not installed or enabled.`;
    }
    if (this._CONFIG.host === '') {
      throw `${this._NAME} Adaptor config \`host\` was empty.`;
    }
    if (!this._CONFIG.port) {
      throw `${this._NAME} Adaptor config \`port\` was empty.`;
    }
    if (!this._CONFIG.token) {
      throw `${this._NAME} Adaptor config \`token\` was empty.`;
    }
    if (!this._CONFIG.organization) {
      throw `${this._NAME} Adaptor config \`organization\` was empty.`;
    }
    if (!this._CONFIG.bucket) {
      throw `${this._NAME} Adaptor config \`bucket\` was empty.`;
    }
    const url = `${this._CONFIG.host}:${this._CONFIG.port}`;
    const token = this._CONFIG.token;
    this._DB = new InfluxDB({ url, token });
  }
  get writeApi() {
    return this._DB.getWriteApi(this._CONFIG.organization, this._CONFIG.bucket, 'ns');
  }
  get queryApi() {
    return this._DB.getQueryApi(this._CONFIG.organization);
  }
  get Point()  {
    return Point;
  }
}

export default InfluxDb;
