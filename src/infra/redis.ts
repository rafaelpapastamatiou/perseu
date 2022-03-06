import { createClient } from 'redis';

import { Cache } from '@application/providers/cache';

const redisClient = createClient();

export class Redis implements Cache {
  private client = redisClient;

  async get(key: string): Promise<any> {
    const data = await this.client.get(key);

    if (!data) return undefined;

    return JSON.parse(data);
  }

  async set(key: string, data: any): Promise<void> {
    await this.client.set(key, JSON.stringify(data), { EX: 60 * 5 });
  }
}

export async function setupRedisClient() {
  redisClient.on('error', (err) => {
    throw new Error(`Error creating redis client: ${err}`);
  });

  await redisClient.connect();
}
