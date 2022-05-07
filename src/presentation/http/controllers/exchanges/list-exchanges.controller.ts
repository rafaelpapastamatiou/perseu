import { ExchangeDTO } from '@application/dtos/exchange.dto';
import { ListExchangesInterface } from '@application/useCases/exchanges/list-exchanges';
import { ok } from '@presentation/http/helpers/http-helpers';
import { Controller } from '@presentation/http/protocols/controller';
import { HttpResponse } from '@presentation/http/protocols/http';

export class ListExchangesController implements Controller {
  constructor(private listExchanges: ListExchangesInterface) {}

  async handle(): Promise<HttpResponse<ExchangeDTO[]>> {
    const exchanges = await this.listExchanges.execute();

    return ok({
      body: exchanges,
    });
  }
}
