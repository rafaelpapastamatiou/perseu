import { ExchangeDTO } from '@application/dtos/exchange.dto';
import { ExchangesRepository } from '@application/providers/repositories/exchanges.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type ListExchangesInterface = UseCase<[], ExchangeDTO[]>;

export class ListExchanges implements ListExchangesInterface {
  constructor(private exchangesRepository: ExchangesRepository) {}

  async execute(): Promise<ExchangeDTO[]> {
    const exchanges = await this.exchangesRepository.find();

    return exchanges.map((exchange) => ExchangeDTO.fromDomain(exchange));
  }
}
