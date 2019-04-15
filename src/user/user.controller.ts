import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  UseFilters,
  UsePipes,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UserService } from './user.service';
import { User } from '../models/user.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { TransformPlainToClass } from 'class-transformer';

@Controller('users')
@UsePipes(ValidationPipe)
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @TransformPlainToClass(UserDto)
  createUser(@Body() user: UserDto): UserDto {
    return this.userService.createUser(user);
  }

  @Get()
  @TransformPlainToClass(UserDto)
  @UseInterceptors(TransformInterceptor)
  getAllUsers(): UserDto[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @TransformPlainToClass(UserDto)
  getOneUser(@Param('id', new ParseIntPipe()) id: number): UserDto {
    // String parsed into an integer value with built-in pipe
    return this.userService.getOneUser(+id);
  }

  @Put(':id')
  @TransformPlainToClass(UserDto)
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDto): UserDto {
    return this.userService.updateUser(+id, updatedUser); // String converted into an integer value with parseInt shorthand
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles('admin') // For test purpose only: comment this line to deactivate the route guard 'role'
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(parseInt(id, 10)); // String converted into an integer value with parseInt with radix arg
  }
}
