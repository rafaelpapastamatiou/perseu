import { AssetsProvider } from '@application/providers/assets';

export class AssetsStub implements AssetsProvider {
  async getPriceBySymbol(): Promise<number> {
    return 100;
  }
  async getEodPriceBySymbol(): Promise<number> {
    return 50;
  }
}
