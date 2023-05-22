import nodeFetch from 'node-fetch';

class Webhook {
  private _NAME: string;
  private _CONFIG: KrakenConfig.webhook;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.webhook;
    this._NAME = this._CONFIG.name;
    if (!this._CONFIG.enable) {
      throw `${this._NAME} Adaptor was not installed or enabled.`;
    }
    if (this._CONFIG.targets.length < 1) {
      throw `${this._NAME} Adaptor must have 1 or more target.`;
    }
  }
  public async post(payload: KrakenAdaptor.WebhookPayload): Promise<string> {
    try {
      if (!payload.target || !payload.body) {
        throw `Illigal parameter: ${this._NAME} adaptor could not post the data`;
      }
      const url = this.getTargetUrl(payload.target); 
      if (!url) {
        throw `Illigal target name: ${this._NAME} adaptor could not find target.name \`${payload.target}\``;
      }
      const body = JSON.stringify(payload.body);
      const options = {
        body,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      };
      const res = await nodeFetch(url, options);
      return await res.text();
    } catch (e) {
      throw e;
    }
  }
  private getTargetUrl(name: string): string | null {
    const t = this._CONFIG.targets.find(v => v.name === name);
    if (t?.url) return t.url;
    return null;
  }
}

export default Webhook;
