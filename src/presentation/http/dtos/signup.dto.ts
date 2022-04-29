import { IsString, IsEmail, MinLength } from 'class-validator';

export class SignUpRequestDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
