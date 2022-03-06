import { NotFoundException } from '@domain/exceptions/not-found.exception';

export class TwelvedataStockNotFoundException extends NotFoundException {
  constructor(symbol: string) {
    super(`Stock ${symbol} not found on TwelveData.`);
  }
}
