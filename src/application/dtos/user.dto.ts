import { User } from '@domain/entities/user';

export class UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  static fromDomain(user: User): UserDTO {
    const dto = new UserDTO();

    dto.id = user.id;
    dto.email = user.email;
    dto.firstName = user.firstName;
    dto.lastName = user.lastName;

    return dto;
  }
}
