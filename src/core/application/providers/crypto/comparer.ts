export interface Comparer {
  compare(plaitext: string, digest: string): Promise<boolean>;
}
