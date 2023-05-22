import { EventEmitter as OriginalEventEmitter } from 'events';

export class EventEmitter extends OriginalEventEmitter {
  public emit<T extends (...args: any[]) => void>(port: EventPort<T>, ...args: Parameters<T>): boolean;
  public emit(name: string | symbol, ...args: any): boolean;
  public emit(event: any, ...args: any[]) {
    const name = event instanceof EventPort ? event.name : event;
    return super.emit(name, ...args);
  }
}

/**
 * A port to deliver an event to listeners.
 */
export class EventPort<T extends (...args: any[]) => void> {
  /**
   * Initialize an instance of EventPort<T> class.
   * @param name The name of the event.
   * @param emitter An instance of EventEmitter class.
   */
  public constructor(name: string | symbol, emitter: EventEmitter) {
    this._NAME = name;
    this._EMITTER = emitter;
  }

  private readonly _NAME: string | symbol;
  private readonly _EMITTER: EventEmitter;

  /**
   * Gets the name of the event.
   */
  public get name() {
    return this._NAME;
  }

  /**
   * Adds a listener.
   * @param listener The listener to be added.
   */
  public on(listener: T) {
    this._EMITTER.on(this._NAME, listener);
  }

  /**
   * Adds a listener that will be called only once.
   * @param listener The listener to be added.
   */
  public once(listener: T) {
    this._EMITTER.once(this._NAME, listener);
  }

  /**
   * Removes a listener.
   * @param listener The listener to be removed.
   */
  public off(listener: T) {
    this._EMITTER.off(this._NAME, listener);
  }

  /**
   * Removes the all listeners.
   * @param listener
   */
  public removeAllListeners() {
    this._EMITTER.removeAllListeners(this._NAME);
  }
}
