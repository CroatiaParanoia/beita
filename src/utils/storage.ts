type StorageType = 'localStorage' | 'sessionStorage';

interface UpdateSourceOptions {
  /**
   * 多久后过期 单位秒， -1 永不过期
   */
  expire: number;
}

export interface Source<T> {
  value: T;
  expire: number;
}

export enum SourceStatus {
  Empty = 'empty',
  Expired = 'expired',
  HasContent = 'has-content',
}

interface StorageOptions {
  prefix?: string | string[];
}

export class Storage<Mapping extends Record<string, any>> {
  #storageType: StorageType;
  #storage: typeof window.localStorage;

  #prefix: StorageOptions['prefix'] = '';

  constructor(type: StorageType, options?: StorageOptions) {
    if (options?.prefix) {
      this.#prefix = options.prefix;
    }

    this.#storageType = type;
    this.#storage = type === 'localStorage' ? window.localStorage : window.sessionStorage;
  }

  set<Key extends keyof Mapping>(key: Key, value: Mapping[Key], options?: UpdateSourceOptions) {
    const source = this.#createSource(value);

    if (options?.expire && options.expire > 0) {
      source.expire += options.expire * 1000;
    }

    const realKey = this.#getKey(key);
    const stringifyValue = this.#stringify(source);

    this.#storage.setItem(realKey, stringifyValue);
  }

  get<Key extends keyof Mapping>(key: Key) {
    const realKey = this.#getKey(key);

    const stringifyValue = this.#storage.getItem(realKey);

    if (!stringifyValue) {
      return null;
    }

    const { expire, value } = this.#parse<Mapping[Key]>(stringifyValue);

    const now = Date.now();

    if (expire === -1 || !expire || now < expire) {
      return value;
    }

    return null;
  }

  remove<Key extends keyof Mapping>(key: Key) {
    const realKey = this.#getKey(key);

    this.#storage.removeItem(realKey);
  }

  #getKey(key: string | number | symbol): string {
    if (this.#prefix) {
      const tempPrefix = ([] as string[]).concat(this.#prefix);
      return [...tempPrefix, key as string].join('_');
    }

    return key as string;
  }

  #stringify(v: Source<any>): string {
    return JSON.stringify(v);
  }

  #parse<T>(v: string): Source<T> {
    return JSON.parse(v) as Source<T>;
  }

  #createSource<T>(value: T, expire = -1): Source<T> {
    return {
      value,
      expire,
    };
  }
}
