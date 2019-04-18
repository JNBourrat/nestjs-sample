import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../models/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUserByPassword(loginAttempt: LoginUserDto) {
    const userToAttempt = await this.userService.getUserById(loginAttempt.id);

    return new Promise(resolve => {
      if (!userToAttempt || userToAttempt.password !== loginAttempt.password) {
        throw new HttpException('USER NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
      } else {
        resolve(this.signIn(loginAttempt.id));
      }
    });
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    return await this.userService.getUserById(payload.id);
  }

  async signIn(id: number): Promise<string> {
    const data: JwtPayload = { id };
    return this.jwtService.sign(data);
  }
}
