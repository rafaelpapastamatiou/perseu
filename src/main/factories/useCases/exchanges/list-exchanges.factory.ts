import { ListExchanges } from '@application/useCases/exchanges/list-exchanges';
import { makeExchangesRepository } from '@main/factories/providers/repositories/exchanges.repository.factory';

export function makeListExchanges() {
  const exchangesRepository = makeExchangesRepository();

  return new ListExchanges(exchangesRepository);
}
