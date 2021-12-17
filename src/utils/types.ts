export type Merge<T, P> = P & Omit<T, keyof P>;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type Dict<T = any> = Record<string, T>;

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
