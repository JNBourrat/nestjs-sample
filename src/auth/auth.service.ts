import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { LoginUserDto } from '../models/login-user.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  validateUserByPassword(loginAttempt: LoginUserDto) {
    return this.userService.getUserById(loginAttempt.id).pipe(
      map(userToAttempt => {
        if (!userToAttempt || userToAttempt.password !== loginAttempt.password) {
          throw new HttpException('USER NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
        } else {
          return this.signIn(loginAttempt.id);
        }
      }),
    );
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    return await this.userService.getUserById(payload.id);
  }

  async signIn(id: number): Promise<string> {
    const data: JwtPayload = { id };
    return this.jwtService.sign(data);
  }
}
