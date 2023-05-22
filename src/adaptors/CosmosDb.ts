import { CosmosClient, DatabaseResponse } from '@azure/cosmos';

/*
 * Example:
 *
 * private _COSMOS: DatabaseResponse|null;
 * private COSMOS_COLLECTION = 'users';
 * 
 * this._COSMOS = null;
 *  new CosmosDb().instance().then((db) => {
 *    this._COSMOS = db;
 *   logger.log('CosmosDB connected');
 * }).catch((e) => {
 *   throw(e);
 * });
 * 
 * const { container } = await this._COSMOS.database.containers.createIfNotExists({ id: COSMOS_COLLECTION });
 * const { item } = await container.items.create(data);
 * logger.log(`Posted data to CosmosDB ${item.id}`);
 * 
*/

class CosmosDb {
  private _NAME: string;
  private _CONFIG: KrakenConfig.cosmosdb;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.cosmosdb;
    this._NAME = this._CONFIG.name;
    if (!this._CONFIG.enable) {
      throw `${this._NAME} Adaptor was not installed or enabled.`;
    }
    if (this._CONFIG.endpoint === '') {
      throw `${this._NAME} Adaptor config \`endpoint\` was empty.`;
    }
    if (!this._CONFIG.key) {
      throw `${this._NAME} Adaptor config \`key\` was empty.`;
    }
    if (!this._CONFIG.database) {
      throw `${this._NAME} Adaptor config \`database\` was empty.`;
    }
  }
  public async instance(): Promise<DatabaseResponse> {
    const endpoint = this._CONFIG.endpoint;
    const key = this._CONFIG.key;
    const database = this._CONFIG.database;
    const client = new CosmosClient({ endpoint, key });
    return await client.databases.createIfNotExists({ id: database });
  }
}

export default CosmosDb;
