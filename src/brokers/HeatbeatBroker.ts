import InfluxDb from '../adaptors/InfluxDb';
import logger from '../core/logger';

interface HeatbeatPayload {
  eventType: string;
  id: string;
  dt: number;
}

class HeatbeatBroker {
  /*
   * Here is a sample code which store the payload data to InfluxDB
   */
  private _INFLUX;
  private _MEASUREMENT = 'heatbeat';
  constructor() {
    /* Write the logic here if you would like to run something when the Broker start was started */
    /*
    * Here is a sample code which store the payload data to InfluxDB
    */
    this._INFLUX = new InfluxDb();
  }
  /* eslint @typescript-eslint/require-await: 0 */
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  public async onData(kind: string, provider: string, payload: HeatbeatPayload): Promise<void> {
    try {
      switch (payload.eventType) {
      case '__KRKN_HEATBEAT__':
        await this._savePing(payload);
        break;
      default:
        break;
      }
    } catch (e: unknown) {
      if (e instanceof Error) logger.error(e.message);
    }
  }
  private async _savePing(payload: HeatbeatPayload): Promise<void> {
    const api = this._INFLUX.writeApi;
    const point = new this._INFLUX.Point(this._MEASUREMENT);
    point.intField('ping', 1)
      .tag('client_id', payload.id)
      .timestamp(new Date(payload.dt * 1000));
    api.writePoint(point);
    logger.log('Saved ping data to InfluxDB from kraken edge heartbeater');
    await api.close();
  }
}

export default HeatbeatBroker;
