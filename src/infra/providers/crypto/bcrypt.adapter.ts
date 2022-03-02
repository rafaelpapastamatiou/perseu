import bcrypt from 'bcrypt';

import { Comparer } from '@application/providers/crypto/comparer';
import { Hasher } from '@application/providers/crypto/hasher';

export class BcryptAdapter implements Hasher, Comparer {
  constructor(private readonly salt: number) {}

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
