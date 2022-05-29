import { GetAssetPriceInterface } from '@application/useCases/assets/get-asset-price';
import { StockPriceRequestDTO } from '../dtos/stock-price.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class AssetPriceController implements Controller {
  constructor(private getAssetType: GetAssetPriceInterface) {}

  async handle({
    query,
  }: HttpRequest<any, any, StockPriceRequestDTO>): Promise<
    HttpResponse<number>
  > {
    const price = await this.getAssetType.execute({
      symbol: query.symbol,
      exchange: query.exchange,
    });

    return ok<number>({
      body: price,
    });
  }
}
