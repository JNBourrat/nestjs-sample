import { IsString, IsNumber } from 'class-validator';

export class LoginUserDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly password: string;
}
