import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  // constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  // async signIn(): Promise<string> {
  //   // In the real-world app you shouldn't expose this method publicly
  //   // instead, return a token once you verify user credentials
  //   const user: JwtPayload = { id: 15 };
  //   return this.jwtService.sign(user);
  // }
  // async validateUser(payload: JwtPayload): Promise<any> {
  //   return await this.userService.getOneUser(payload.id);
  // }
}