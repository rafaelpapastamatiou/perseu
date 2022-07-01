import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsLog } from '@domain/entities/user-assets-log';

export interface UserAssetsLogsRepository {
  generateId(): Promise<string>;
  find(params: FindWithAuth): Promise<UserAssetsLog[]>;
  findLastLog(params: FindWithAuth): Promise<UserAssetsLog | undefined>;
  add(userAssetsLog: UserAssetsLog): Promise<void>;
}

export type FindUserAssetsLogByDate = FindWithAuth & {
  month: number;
  day: number;
  year: number;
};
