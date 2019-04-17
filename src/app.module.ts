import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
