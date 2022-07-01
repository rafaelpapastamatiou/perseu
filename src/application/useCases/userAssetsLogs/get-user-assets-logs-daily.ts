import { UserAssetsLogDTO } from '@application/dtos/user-assets-log.dto';
import { FindWithAuth } from '@application/protocols/repository.protocols';
import { UserAssetsLogsRepository } from '@application/providers/repositories/user-assets-logs.repository';
import { UseCase } from '@domain/interfaces/use-case';

export type GetUserAssetsLogsDailyInterface = UseCase<
  [FindWithAuth],
  UserAssetsLogDTO[]
>;

export class GetUserAssetsLogsDaily implements GetUserAssetsLogsDailyInterface {
  constructor(private userAssetsLogsRepository: UserAssetsLogsRepository) {}

  async execute({ userId }: FindWithAuth): Promise<UserAssetsLogDTO[]> {
    const userAssetsLogs = await this.userAssetsLogsRepository.find({ userId });

    return userAssetsLogs.map((log) => UserAssetsLogDTO.fromDomain(log));
  }
}
