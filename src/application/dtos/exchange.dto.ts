import { Exchange } from '@domain/entities/exchange';

export class ExchangeDTO {
  name: string;
  country: string;
  timezone: string;

  static fromDomain(exchange: Exchange): ExchangeDTO {
    const dto = new ExchangeDTO();

    dto.name = exchange.name;
    dto.country = exchange.country;
    dto.timezone = exchange.timezone;

    return dto;
  }
}
