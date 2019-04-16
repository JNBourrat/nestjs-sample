import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../models/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  async validateUserById(loginAttempt: LoginUserDto) {
    // This will be used for the initial login
    const userToAttempt = await this.userService.getOneUser(loginAttempt.id);

    return new Promise(resolve => {
      if (!userToAttempt) {
        throw new HttpException('USER NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
      } else {
        resolve(this.signIn(loginAttempt.id));
      }
    });
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    return await this.userService.getOneUser(payload.id);
  }

  async signIn(userId: number): Promise<string> {
    // In the real-world app you shouldn't expose this method publicly
    // instead, return a token once you verify user credentials
    const data: JwtPayload = { id: userId };
    return this.jwtService.sign(data);
  }
}
