import ioredis from 'ioredis';

class Redis {
  private _NAME: string;
  private _CONFIG: KrakenConfig.redis;
  private _DB: ioredis.Redis;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.redis;
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
    try {
      const options: ioredis.RedisOptions = {
        host: this._CONFIG.host,
        port: this._CONFIG.port,
        family: 4,
        db: 0,
      };
      if (!this._CONFIG.username || this._CONFIG.username !== '') {
        options.username = this._CONFIG.username;
      }
      if (!this._CONFIG.password || this._CONFIG.password !== '') {
        options.password = this._CONFIG.password;
      }
      if (!this._CONFIG.keyPrefix || this._CONFIG.keyPrefix !== '') {
        options.keyPrefix = this._CONFIG.keyPrefix;
      }
      this._DB = new ioredis(options);
    } catch (e) {
      throw e;
    }
  }
  get instance() {
    return this._DB;
  }
}

export default Redis;
