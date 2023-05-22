import nodeFetch from 'node-fetch';
import logger from '../core/logger';

class Tinkermode {
  private _NAME: string;
  private _CONFIG: KrakenConfig.tinkermode;
  private _DEVICE_ID: number;
  private _API_KEY: string;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.tinkermode;
    this._NAME = this._CONFIG.name;
    if (!this._CONFIG.enable) {
      throw `${this._NAME} Adaptor was not installed or enabled.`;
    }
    if (this._CONFIG.baseUrl === '') {
      throw `${this._NAME} Adaptor config \`baseUrl\` was empty.`;
    }
    this._DEVICE_ID = this._CONFIG.deviceId;    // set default deviceId from config
    this._API_KEY = this._CONFIG.deviceApikey;  // set default api key from config
  }
  set deviceId(id: number) {
    if (id) this._DEVICE_ID = id;
  }
  set apiKey(key: string) {
    if (key) this._API_KEY = key;
  }
  public async put(payload: KrakenAdaptor.TMTimeseriesEvent|KrakenAdaptor.TMCollectionEvent): Promise<boolean> {
    try {
      const body: string = JSON.stringify(payload);
      const url = `${this._CONFIG.baseUrl}/devices/${this._DEVICE_ID}/event`;
      const options = {
        body,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `ModeCloud ${this._API_KEY}`,
        },
      };
      const res = await nodeFetch(url, options);
      if (res.status !== 204) {
        logger.error(`${this._CONFIG.name} adaptor post(): receive invalid http status ${res.status}.`);
        return false;
      }
      return true;
    } catch (e: unknown) {
      if (e instanceof Error) logger.error(e.message);
      return false;
    }
  }
}

export default Tinkermode;
