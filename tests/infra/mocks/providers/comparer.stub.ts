import { Comparer } from '@application/providers/crypto/comparer';

export class HashComparerStub implements Comparer {
  async compare(plaitext: string, digest: string): Promise<boolean> {
    return plaitext === digest;
  }
}
