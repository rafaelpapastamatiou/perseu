import { GetAssetInfoInterface } from '@application/useCases/assets/get-asset-info';
import {
  StockInfoRequestDTO,
  StockInfoResponseDTO,
} from '../dtos/stock-info.dto';
import { ok } from '../helpers/http-helpers';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class StockInfoController implements Controller {
  constructor(private GetAssetInfo: GetAssetInfoInterface) {}

  async handle({
    query,
  }: HttpRequest<any, any, StockInfoRequestDTO>): Promise<
    HttpResponse<StockInfoResponseDTO>
  > {
    const stockInfo = await this.GetAssetInfo.execute({
      symbol: query.symbol,
      exchange: query.exchange,
    });

    return ok<StockInfoResponseDTO>({
      body: stockInfo,
    });
  }
}
