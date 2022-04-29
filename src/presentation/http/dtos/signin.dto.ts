import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserDTO } from './user.dto';

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
