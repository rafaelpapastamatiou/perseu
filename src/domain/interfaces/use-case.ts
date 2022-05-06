export interface UseCase<P extends any[], R> {
  execute(...params: P): Promise<R> | R;
}
