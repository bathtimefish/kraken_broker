import nodeFetch from 'node-fetch';
import logger from '../core/logger';

class Slack {
  private _NAME: string;
  private _CONFIG: KrakenConfig.slack;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.slack;
    this._NAME = this._CONFIG.name;
    if (!this._CONFIG.enable) {
      throw `${this._NAME} Adaptor was not installed or enabled.`;
    }
    if (this._CONFIG.url === '') {
      throw `${this._NAME} Adaptor config \`url\` was empty.`;
    }
  }
  public async post(payload: KrakenAdaptor.SlackPayload): Promise<boolean> {
    try {
      const body: string = JSON.stringify(payload);
      const options = {
        body,
        method: 'POST',
      };
      const res = await nodeFetch(this._CONFIG.url, options);
      if (res.status !== 200) {
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

export default Slack;
