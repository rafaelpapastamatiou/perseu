import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsProfitabilityLog } from '@domain/entities/user-assets-profitability-log';

export interface UserAssetsProfitabilityLogsRepository {
  find(params: FindWithAuth): Promise<UserAssetsProfitabilityLog[]>;
  generateId(): Promise<string>;
  add(log: UserAssetsProfitabilityLog): Promise<void>;
}
