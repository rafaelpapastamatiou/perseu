import { Exchange } from '@domain/entities/exchange';

export interface ExchangesRepository {
  find(): Promise<Exchange[]>;
  findByCode(name: string): Promise<Exchange | undefined>;
  save(exchange: Exchange): Promise<void>;
  import(exchanges: Exchange[]): Promise<void>;
  generateId(): Promise<string>;
}
