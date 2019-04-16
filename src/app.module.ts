import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [AuthService],
})
export class AppModule {}
