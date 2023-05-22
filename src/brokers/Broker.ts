// import InfluxDb from '../adaptors/InfluxDb';
// import Slack from '../adaptors/Slack';
// import Tinkermode from '../adaptors/Tinkermode';
import logger from '../core/logger';

class Broker {
  /*
   * Here is a sample code which store the payload data to InfluxDB
   */
  // private _INFLUX;
  // private _MEASUREMENT = 'kraken_test';
  // private _SLACK;
  // private _MODE;
  constructor() {
    /* Write the logic here if you would like to run something when the Broker start was started */
    /*
    * Here is a sample code which store the payload data to InfluxDB
    */
    // this._INFLUX = new InfluxDb();
    // this._SLACK = new Slack();
    // this._MODE = new Tinkermode();
  }
  /* eslint @typescript-eslint/require-await: 0 */
  /* eslint @typescript-eslint/no-explicit-any: 0 */
  public async onData(kind: string, provider: string, payload: any): Promise<void> {
    /* Write broker logic here */
    logger.log(`Kind: ${kind}`);
    logger.log(`Provider: ${provider}`);
    logger.log(`Payload: ${JSON.stringify(payload)}`);
    /*
     * Here is a sample code which store the payload data to InfluxDB
     * and send payload to Slack.
     *
     */
    try {
      /*
      const api = this._INFLUX.writeApi;
      const point = new this._INFLUX.Point(this._MEASUREMENT);
      point.floatField('temperature', payload.temperature)
        .floatField('humidity', payload.humidity)
        .intField('noise', payload.noise)
        .tag('area', payload.area);
      if (payload.hasOwnProperty('timestamp')) {
        point.timestamp(new Date(payload.timestamp));
      }
      api.writePoint(point);
      logger.log('Saved payload as a time series data to InfluxDB 2 from collector');
      await api.close();
      const slackPayload: KrakenAdaptor.SlackPayload = {
        channel: '#random',
        username: 'KrakenBot',
        text: JSON.stringify(payload),
      };
      const result: boolean = await this._SLACK.post(slackPayload);
      logger.log(`Posted to Slack: ${result.toString()}`);
      */
    } catch (e: unknown) {
      if (e instanceof Error) logger.error(e.message);
    }
    /*
     * Here is a sample code which store the payload data to MODE TSDB
     *
     */
    /*
    try {
      const tsEvent: KrakenAdaptor.TMTimeseriesEvent = {
        eventType: 'timeSeriesEvent',
        eventData: {
          timeSeriesData: [
            {
              timestamp: payload.timestamp,
              seriesId: payload.seriesId,
              value: payload.value,
            },
          ],
        },
      };
      const colEvent: KrakenAdaptor.TMCollectionEvent = {
        eventType: 'collectionEvent',
        eventData: {
          collectionId: 'kraken-test-collection',
          valueNames: ['val1', 'val2', 'val3'],
          tagNames: ['name', 'kind'],
          records: [
            {
              timestamp: payload.timestamp,
              values: [
                parseInt(payload.val1, 10),
                parseInt(payload.val2, 10),
                parseInt(payload.val3, 10),
              ],
              tags: ['kraken', 'broker'],
            },
          ],
        },
      };
      const mode: boolean = await this._MODE.put(colEvent);
      logger.log(`Put an event to MODE TSDB ${mode.toString()}`);
      const slackPayload: KrakenAdaptor.SlackPayload = {
        channel: '#random',
        username: 'KrakenBot',
        text: JSON.stringify(payload),
      };
      const result: boolean = await this._SLACK.post(slackPayload);
      logger.log(`Posted to Slack: ${result.toString()}`);
    } catch (e) {
      logger.error(e);
    }
    */
  }
}

export default Broker;
