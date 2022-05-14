import { StocksRepository } from '@application/providers/repositories/stocks.repository';
import { Stocks } from '@application/providers/stocks';
import { Stock } from '@domain/entities/stock';
import { UseCase } from '@domain/interfaces/use-case';

export type FetchStocksInterface = UseCase<[], void>;

export class FetchStocks implements FetchStocksInterface {
  constructor(
    private stocksProvider: Stocks,
    private stocksRepository: StocksRepository,
  ) {}

  async execute(): Promise<void> {
    const stocksDataArray = await this.stocksProvider.find();

    const idsArray: string[] = [];

    for (const _ of stocksDataArray) {
      const id = await this.stocksRepository.generateId();

      idsArray.push(id);
    }

    const stocks: Stock[] = [];

    for (const [index, id] of idsArray.entries()) {
      const stock = Stock.create(id, {
        ...stocksDataArray[index],
        micCode: stocksDataArray[index].mic_code,
      });

      stocks.push(stock);
    }

    await this.stocksRepository.import(stocks);
  }
}
