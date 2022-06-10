import { NotFoundException } from '@domain/exceptions/not-found.exception';

export class TwelvedataAssetNotFoundException extends NotFoundException {
  constructor(symbol: string) {
    super(`Asset ${symbol} not found on TwelveData.`);
  }
}
