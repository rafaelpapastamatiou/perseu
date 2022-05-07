import { makeListExchanges } from '@main/factories/useCases/exchanges/list-exchanges.factory';
import { ListExchangesController } from '@presentation/http/controllers/exchanges/list-exchanges.controller';

export function makeListExchangesController() {
  const listExchanges = makeListExchanges();

  return new ListExchangesController(listExchanges);
}
