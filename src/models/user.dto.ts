import { IsString, IsNumber } from 'class-validator';

export class UserDto {
  @IsString()
  readonly firstname: string;

  @IsString()
  readonly lastname: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly city: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly phone: string;
}
