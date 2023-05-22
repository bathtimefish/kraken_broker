import ws from 'ws';
import logger from '../core/logger';

class WebSocket {
  private _NAME: string;
  private _CONFIG: KrakenConfig.websocket;
  private _WS: any;
  constructor() {
    this._CONFIG = global.kraken.config.adaptor.websocket;
    this._NAME = this._CONFIG.name;
    if (!this._CONFIG.enable) {
      throw `${this._NAME} Adaptor was not installed or enabled.`;
    }
    if (!this._CONFIG.port) {
      throw `${this._NAME} Adaptor config \`port\` was empty.`;
    }
    logger.log(`${this._NAME} Adaptor start WebSockert server listening port ${this._CONFIG.port}.`);
    const wss = new ws.Server({ port: this._CONFIG.port });
    wss.on('connection', (ws: ws) => {
      logger.log('Connected a new WebSocket client.');
      ws.on('message', (msg) => {
        logger.log(`${this._NAME} received: ${msg}`);
      });
      this._WS = ws;
    });
  }
  public async send(payload: any): Promise<boolean>  {
    try {
      if (!payload) {
        throw `${this._NAME} adaptor: payload was empty so could not send the data`;
      }
      this._WS.send(JSON.stringify(payload));
      logger.log(`Send websocket message: ${JSON.stringify(payload)}`);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default WebSocket;
