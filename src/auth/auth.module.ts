import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { ConfigService } from '../config/config-service';
import { ConfigModule } from '../config/config.module';

const configService = new ConfigService(`config/${process.env.NODE_ENV}.env`);

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: configService.get('jwtSecret'),
      signOptions: {
        expiresIn: `7d`,
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
