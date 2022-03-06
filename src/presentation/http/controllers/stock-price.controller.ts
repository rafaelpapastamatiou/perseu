import { GetStockPriceSignature } from '@domain/useCases/stocks/get-stock-price';
import { GetStockPriceDTO } from '../dtos/get-stock-price.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class StockPriceController implements Controller {
  constructor(private getStockPrice: GetStockPriceSignature) {}

  async handle({
    query,
  }: HttpRequest<any, any, GetStockPriceDTO>): Promise<HttpResponse> {
    const price = await this.getStockPrice.execute({
      symbol: query.symbol,
      exchange: query.exchange,
    });

    return ok({
      price,
    });
  }
}