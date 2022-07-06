import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsLog } from '@domain/entities/user-assets-log';

export interface UserAssetsLogsRepository {
  generateId(): Promise<string>;
  find(params: FindWithAuth): Promise<UserAssetsLog[]>;
  findByDate(
    params: FindUserAssetsLogByDate,
  ): Promise<UserAssetsLog | undefined>;
  findLastLog(params: FindWithAuth): Promise<UserAssetsLog | undefined>;
  create(userAssetsLog: UserAssetsLog): Promise<void>;
  save(userAssetsLog: UserAssetsLog): Promise<void>;
}

export type FindUserAssetsLogByDate = FindWithAuth & {
  date: Date;
};
