import { Redis } from '@infra/redis';

export function makeRedisCache() {
  return new Redis();
}
