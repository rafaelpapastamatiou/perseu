import { Etfs } from '@application/providers/etfs';
import { AssetTypesRepository } from '@application/providers/repositories/asset-types.repository';
import { AssetsRepository } from '@application/providers/repositories/assets.repository';
import { Stocks } from '@application/providers/stocks';
import { Asset, AssetTypes } from '@domain/entities/asset';
import { UseCase } from '@domain/interfaces/use-case';

export type FetchAssetsInterface = UseCase<[], void>;

const acceptedStocksRegex = /(stock|reit)/i;

export class FetchAssets implements FetchAssetsInterface {
  constructor(
    private assetsRepository: AssetsRepository,
    private assetTypesRepository: AssetTypesRepository,
    private stocksProvider: Stocks,
    private etfsProvider: Etfs,
  ) {}

  async execute(): Promise<void> {
    // FETCH DATA
    const fetchStocksPromise = this.stocksProvider.find();
    const fetchEtfsPromise = this.etfsProvider.find();
    const getAssetTypesIdsPromise = this.getAssetTypesIds();

    const results = await Promise.all([
      fetchStocksPromise,
      fetchEtfsPromise,
      getAssetTypesIdsPromise,
    ]);

    let [stocksArray] = results;
    stocksArray = stocksArray.filter((stockData) =>
      stockData.type.match(acceptedStocksRegex),
    );

    const [, etfsArray, assetTypesIds] = results;

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

      const assetType = getStockType(stockData.type);

      const stock = Asset.create(id, {
        ...stockData,
        type: assetTypesIds[assetType],
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
        type: assetTypesIds.ETF,
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

  private async getAssetTypesIds(): Promise<AssetTypesIds> {
    const assetTypes = await this.assetTypesRepository.find();

    const stockType = assetTypes.find((assetType) =>
      assetType.name.match(/stock/i),
    );

    const etfType = assetTypes.find((assetType) =>
      assetType.name.match(/etf/i),
    );

    const reitType = assetTypes.find((assetType) =>
      assetType.name.match(/reit/i),
    );

    // const stockId = assetTypes.find((assetType) =>
    //   assetType.name.match(/stock/i),
    // );
    // const stockId = assetTypes.find((assetType) =>
    //   assetType.name.match(/stock/i),
    // );

    const types = [stockType, etfType, reitType];

    for (const type of types) {
      if (!type) {
        throw new Error(
          "Can't find required asset types. Seed the database with the correct values (Stock, ETF, REIT, Crypto, Index).",
        );
      }
    }

    return {
      Stock: stockType.id,
      ETF: etfType.id,
      REIT: reitType.id,
      Crypto: undefined,
      Index: undefined,
    };
  }
}

type AssetTypesIds = {
  [key in AssetTypes]: string;
};

const isReitRegex = /reit/i;

function getStockType(type: string): AssetTypes {
  if (type.match(isReitRegex)) return AssetTypes.REIT;

  return AssetTypes.Stock;
}
