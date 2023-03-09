import { IsDefined, IsEmail, IsNumber, IsString, IsStrongPassword } from 'class-validator';
import { UsersEntity } from '../entities/user.entity';

export class UsersDto {
  deleteAt?: any;
  updateAt: Date;
  createdAt: Date;

  @IsDefined()
  @IsNumber()
  id: number;

  @IsString()
  hashPassword: string;

  @IsString()
  email: string;
}

export class NewUserDto {
  @IsString()
  @IsDefined()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  password: string;

  @IsEmail()
  @IsDefined()
  email: string;
}

export class UserWithTokenDto extends UsersEntity {
  token: string;
}

export class UserLoginDto {
  @IsEmail()
  login: string;

  @IsString()
  password: string;
}
