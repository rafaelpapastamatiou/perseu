export interface Cache {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, data: any): Promise<void>;
}
