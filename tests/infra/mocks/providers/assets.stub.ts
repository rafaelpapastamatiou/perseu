import {
  AssetsProvider,
  GetAssetProfileResult,
} from '@application/providers/assets';

export class AssetsStub implements AssetsProvider {
  async getProfile(): Promise<GetAssetProfileResult> {
    return {
      address: 'address',
      CEO: 'CEO',
      city: 'Belo Horizonte',
      country: 'Brazil',
      description: 'Description',
      employees: 100,
      exchange: 'NASDAQ',
      industry: 'Tech',
      name: 'Fake company',
      phone: '(99) 99999-9999',
      sector: 'Tech',
      state: 'MG',
      symbol: 'FAKE',
      type: 'Stock',
      website: 'https://perseu.app',
      zip: '99999-999',
      logo: '',
    };
  }

  async getPriceBySymbol(): Promise<number> {
    return 100;
  }
  async getEodPriceBySymbol(): Promise<number> {
    return 50;
  }
}
