type EventCallback<T> = (params: T) => void;

interface EventItem<T = any> {
  type: 'once' | 'default';
  event: EventCallback<T>;
  $id: number;
}

interface EventStore<T = any> {
  [x: string]: EventItem<T>[];
}

export class Event<T extends Record<string, any>> {
  private _events: EventStore<any> = {};

  public on<K extends keyof T>(eventName: K, callback: EventCallback<T[K]>) {
    const $id = Date.now();
    const eventItem: EventItem = { type: 'default', event: callback, $id };
    this._addEvent(eventName, eventItem);
    return $id;
  }

  public once<K extends keyof T>(eventName: K, callback: EventCallback<T[K]>) {
    const $id = Date.now();
    const eventItem: EventItem = { type: 'once', event: callback, $id };
    this._addEvent(eventName, eventItem);
    return $id;
  }

  public emit<K extends keyof T>(eventName: K, payload?: T[K], $id?: number) {
    const eventArr = this._getEvent(eventName) || [];

    eventArr.forEach((item, index) => {
      if (!$id || item.$id === $id) {
        item.event(payload);
        if (item.type === 'once') {
          eventArr.splice(index, 1);
        }
      }
    });
  }

  public remove<K extends keyof T>(eventName: K, callback?: EventCallback<T[K]>) {
    if (!callback) {
      this._events[eventName as string] = [];
    } else {
      const eventArr = this._getEvent(eventName) || [];
      this._events[eventName as string] = eventArr.filter((v) => v.event !== callback);
    }
  }

  public clear() {
    this._events = {};
  }

  private _addEvent<K extends keyof T>(eventName: K, eventItem: EventItem) {
    if (this._events[eventName as string]) {
      this._events[eventName as string].push(eventItem);
    } else {
      this._events[eventName as string] = [eventItem];
    }
  }

  private _getEvent<K extends keyof T>(eventName: K): EventItem[] | undefined {
    return this._events[eventName as string];
  }
}
