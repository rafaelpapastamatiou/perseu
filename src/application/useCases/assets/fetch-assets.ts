import { Etfs } from '@application/providers/etfs';
import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { Stocks } from '@application/providers/stocks';
import { Asset, AssetTypes } from '@domain/entities/asset';
import { UseCase } from '@domain/interfaces/use-case';

export type FetchStocksInterface = UseCase<[], void>;

const isStockRegex = /stock/i;

export class FetchStocks implements FetchStocksInterface {
  constructor(
    private assetsRepository: AssetsRepository,
    private stocksProvider: Stocks,
    private etfsProvider: Etfs,
  ) {}

  async execute(): Promise<void> {
    // FETCH DATA
    const fetchStocksPromise = this.stocksProvider.find();
    const fetchEtfsPromise = this.etfsProvider.find();

    const results = await Promise.all([fetchStocksPromise, fetchEtfsPromise]);

    let [stocksArray] = results;
    stocksArray = stocksArray.filter((stockData) =>
      stockData.type.match(isStockRegex),
    );

    const [, etfsArray] = results;

    // GENERATE IDS
    const stocksIdArray: string[] = [];
    const etfsIdArray: string[] = [];

    for (const _ of stocksArray) {
      const id = await this.assetsRepository.generateId();

      stocksIdArray.push(id);
    }

    for (const _ of etfsArray) {
      const id = await this.assetsRepository.generateId();

      etfsIdArray.push(id);
    }

    // FORMAT AND CREATE STOCKS
    const stocks: Asset[] = [];

    for (const [index, id] of stocksIdArray.entries()) {
      const stockData = stocksArray[index];

      const stock = Asset.create(id, {
        ...stockData,
        type: AssetTypes.STOCK,
        micCode: stockData.mic_code,
      });

      stocks.push(stock);
    }

    // FORMAT AND CREATE ETFS
    const etfs: Asset[] = [];

    for (const [index, id] of etfsIdArray.entries()) {
      const etfData = etfsArray[index];

      const etf = Asset.create(id, {
        ...etfData,
        type: AssetTypes.ETF,
        micCode: etfData.mic_code,
      });

      etfs.push(etf);
    }

    // IMPORT ASSETS DATA
    const assets = [...stocks, ...etfs].sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    await this.assetsRepository.import(assets);
  }
}
