import bcrypt from 'bcrypt';

import { Comparer } from '@application/providers/crypto/comparer';
import { Hasher } from '@application/providers/crypto/hasher';

export class BcryptAdapter implements Hasher, Comparer {
  constructor(private readonly salt: number) {}

  async hash(plaitext: string): Promise<string> {
    return bcrypt.hash(plaitext, this.salt);
  }

  async compare(plaitext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaitext, digest);
  }
}
