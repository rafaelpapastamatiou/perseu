import { Hasher } from '@application/providers/crypto/hasher';

export class HasherStub implements Hasher {
  async hash(text: string): Promise<string> {
    return text;
  }
}
