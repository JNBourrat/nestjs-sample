import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { ConfigService } from '../config/config-service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService, configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwtSecret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUserByJwt(payload);
    if (!user) {
      throw new HttpException('USER NOT AUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
