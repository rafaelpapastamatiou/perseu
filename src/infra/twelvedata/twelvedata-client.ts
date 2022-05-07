import axios from 'axios';

import { InternalException } from '@domain/exceptions/internal.exception';

export const twelveDataClient = createTwelveDataClient();

function createTwelveDataClient() {
  if (!process.env.TWELVEDATA_URL) {
    throw new Error('process.env.TWELVEDATA_URL not found');
  }

  if (!process.env.TWELVEDATA_APIKEY) {
    throw new Error('process.env.TWELVEDATA_APIKEY not found');
  }

  const client = axios.create({
    baseURL: process.env.TWELVEDATA_URL,
  });

  client.interceptors.request.use(
    function (config) {
      config.params['apikey'] = process.env.TWELVEDATA_APIKEY;

      return config;
    },
    function (err) {
      return Promise.reject(err);
    },
  );

  client.interceptors.response.use(
    function (response) {
      return response;
    },
    function (err) {
      if (err.response && err.response.data) {
        if (err.response.data.code === 401) {
          throw new InternalException();
        }
      }

      return Promise.reject(err);
    },
  );

  return client;
}
