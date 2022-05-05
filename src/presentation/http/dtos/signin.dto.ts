import { UserDTO } from '@application/dtos/user.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignInRequestDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class SignInResponseDTO {
  accessToken: string;

  user: UserDTO;
}
