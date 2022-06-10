import { TwelvedataAssetNotFoundException } from '../exceptions/twelvedata-asset-not-found.exception';

export function handleTwelvedataProviderError(symbol: string, err: any) {
  if (err.response) {
    const responseData = err.response.data;

    if (
      responseData &&
      responseData.code === 400 &&
      responseData.status === 'error' &&
      responseData.message &&
      responseData.message.includes('not found')
    ) {
      throw new TwelvedataAssetNotFoundException(symbol);
    }
  }

  throw err;
}
