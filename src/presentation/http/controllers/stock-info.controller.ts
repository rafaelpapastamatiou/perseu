import { GetStockInfoSignature } from '@domain/useCases/stocks/get-stock-info';
import { GetStockInfoDTO } from '../dtos/get-stock-info.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class StockInfoController implements Controller {
  constructor(private getStockInfo: GetStockInfoSignature) {}

  async handle({
    query,
  }: HttpRequest<any, any, GetStockInfoDTO>): Promise<HttpResponse> {
    const stockInfo = await this.getStockInfo.execute({
      symbol: query.symbol,
      exchange: query.exchange,
    });

    return ok({
      body: stockInfo,
    });
  }
}
