export interface UseCase {
  execute(...params: any[]): Promise<any> | any;
}
