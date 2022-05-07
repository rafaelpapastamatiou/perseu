import { FetchExchanges } from '@application/useCases/exchanges/fetch-exchanges';
import { makeExchangesRepository } from '@main/factories/providers/repositories/exchanges.repository.factory';
import { makeTwelvedataExchanges } from '@main/factories/providers/twelvedata-exchanges.factory';

export function makeFetchExchanges() {
  const exchangesProvider = makeTwelvedataExchanges();

  const exchangesRepository = makeExchangesRepository();

  return new FetchExchanges(exchangesProvider, exchangesRepository);
}
