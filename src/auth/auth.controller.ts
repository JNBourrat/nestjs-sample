import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../models/login-user.dto';
import { HttpExceptionFilter } from '../filters/http-exception.filter';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseFilters(
    new HttpExceptionFilter(`${AuthController.name}, ${AuthController.prototype.login.name}`),
  )
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.validateUserByPassword(loginUserDto);
  }
}
