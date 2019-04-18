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
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { TransformPlainToClass } from 'class-transformer';
import { MyLogger } from '../middlewares/logger.middleware';
import { AuthGuard } from '@nestjs/passport';

// TODO: try and find a way to dynamically retrieve the name of the handler on which the @UseFilter()
// is applied and use it to send it as an HttpExceptionFilter argument for logging purposes
@Controller('users')
@UsePipes(ValidationPipe)
@UseGuards(RolesGuard)
export class UserController {
  private readonly logger = new MyLogger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(
    new HttpExceptionFilter(`${UserController.name} - ${UserController.prototype.createUser.name}`),
  )
  @TransformPlainToClass(UserDto)
  createUser(@Body() user: UserDto): UserDto {
    return this.userService.createUser(user);
  }

  @Get()
  @UseFilters(
    new HttpExceptionFilter(
      `${UserController.name}, ${UserController.prototype.findAllUsers.name}`,
    ),
  )
  @UseGuards(AuthGuard())
  @UseInterceptors(TransformInterceptor)
  @TransformPlainToClass(UserDto)
  findAllUsers(): UserDto[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @UseFilters(
    new HttpExceptionFilter(`${UserController.name} - ${UserController.prototype.findById.name}`),
  )
  @TransformPlainToClass(UserDto)
  findById(@Param('id', new ParseIntPipe()) id: number): UserDto {
    // String parsed into an integer value with built-in pipe
    return this.userService.getUserById(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @UseFilters(
    new HttpExceptionFilter(`${UserController.name} - ${UserController.prototype.updateUser.name}`),
  )
  @TransformPlainToClass(UserDto)
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDto): UserDto {
    return this.userService.updateUser(+id, updatedUser); // String converted into an integer value with parseInt shorthand
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @UseFilters(
    new HttpExceptionFilter(`${UserController.name} - ${UserController.prototype.deleteUser.name}`),
  )
  @HttpCode(204)
  @Roles('admin') // For test purpose only: comment this line to deactivate the route guard 'role'
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(parseInt(id, 10)); // String converted into an integer value with parseInt with radix arg
  }
}
