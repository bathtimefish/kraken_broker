import mongodb from 'mongodb';
import logger from '../core/logger';

class MongoDb {
  private _NAME: string;
  private _CONFIG: KrakenConfig.mongodb;
  private _DBOPTIONS: mongodb.MongoClientOptions;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.mongodb;
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
    if (!this._CONFIG.database) {
      throw `${this._NAME} Adaptor config \`database\` was empty.`;
    }
    this._DBOPTIONS = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
  public async instance() {
    try {
      const uri = `${this._CONFIG.host}:${this._CONFIG.port}`;
      const mdb: mongodb.MongoClient = await mongodb.connect(uri, this._DBOPTIONS);
      const d: mongodb.Db = mdb.db(this._CONFIG.database);
      return d;
    } catch (e: unknown) {
      if (e instanceof Error) logger.error(e.message);
      return undefined;
    }
  }
  get ObjectID() {
    return mongodb.ObjectID;
  }
}

export default MongoDb;
