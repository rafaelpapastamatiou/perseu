import { ExchangesProvider } from '@application/providers/exchanges';
import { ExchangesRepository } from '@application/providers/repositories/exchanges.repository';
import { Exchange } from '@domain/entities/exchange';
import { UseCase } from '@domain/interfaces/use-case';

export type FetchExchangesInterface = UseCase<[], void>;

export class FetchExchanges implements FetchExchangesInterface {
  constructor(
    private exchangesProvider: ExchangesProvider,
    private exchangesRepository: ExchangesRepository,
  ) {}

  async execute(): Promise<void> {
    const exchangesDataArray = await this.exchangesProvider.find();

    const idsArray: string[] = [];

    for (const _exchangeData of exchangesDataArray) {
      const id = await this.exchangesRepository.generateId();

      idsArray.push(id);
    }

    const exchanges: Exchange[] = [];

    for (const [index, id] of idsArray.entries()) {
      const exchange = Exchange.create(id, exchangesDataArray[index]);

      exchanges.push(exchange);
    }

    await this.exchangesRepository.import(exchanges);
  }
}
