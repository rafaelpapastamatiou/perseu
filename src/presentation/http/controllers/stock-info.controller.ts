import { GetStockInfoInterface } from '@application/useCases/stocks/get-stock-info';
import {
  StockInfoRequestDTO,
  StockInfoResponseDTO,
} from '../dtos/stock-info.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class StockInfoController implements Controller {
  constructor(private getStockInfo: GetStockInfoInterface) {}

  async handle({
    query,
  }: HttpRequest<any, any, StockInfoRequestDTO>): Promise<
    HttpResponse<StockInfoResponseDTO>
  > {
    const stockInfo = await this.getStockInfo.execute({
      symbol: query.symbol,
      exchange: query.exchange,
    });

    return ok<StockInfoResponseDTO>({
      body: stockInfo,
    });
  }
}
