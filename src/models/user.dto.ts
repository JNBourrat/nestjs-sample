import { IsString, IsNumber, IsEmail, IsPhoneNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  @IsString()
  readonly firstname: string;

  @Expose()
  @IsString()
  readonly lastname: string;

  @Expose()
  @IsNumber()
  readonly age: number;

  @Expose()
  @IsString()
  readonly city: string;

  @Expose()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsPhoneNumber('FR')
  readonly phone: string;
}
