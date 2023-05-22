import mysql from 'mysql';

class MySql {
  private _NAME: string;
  private _CONFIG: KrakenConfig.mysql;
  private _DB: mysql.Pool;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.mysql;
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
    if (this._CONFIG.database === '') {
      throw `${this._NAME} Adaptor config \`database\` was empty.`;
    }
    try {
      const options: mysql.PoolConfig = {
        host: this._CONFIG.host,
        port: this._CONFIG.port,
        database: this._CONFIG.database,
      };
      if (!this._CONFIG.username || this._CONFIG.username !== '') {
        options.user = this._CONFIG.username;
      }
      if (!this._CONFIG.password || this._CONFIG.password !== '') {
        options.password = this._CONFIG.password;
      }
      this._DB = mysql.createPool(options);
    } catch (e) {
      throw e;
    }
  }
  get instance() {
    return this._DB;
  }
}

export default MySql;
