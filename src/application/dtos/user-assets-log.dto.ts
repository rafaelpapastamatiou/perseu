import { UserAssetsLog } from '@domain/entities/user-assets-log';

export class UserAssetsLogDTO {
  id: string;
  date: Date;
  total: number;
  userId: string;

  static fromDomain(userAssetsLog: UserAssetsLog): UserAssetsLogDTO {
    const userAssetsLogDto = new UserAssetsLogDTO();

    userAssetsLogDto.id = userAssetsLog.id;
    userAssetsLogDto.date = userAssetsLog.date;
    userAssetsLogDto.total = userAssetsLog.total;
    userAssetsLogDto.userId = userAssetsLog.userId;

    return userAssetsLogDto;
  }
}
