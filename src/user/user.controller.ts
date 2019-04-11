import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseFilters, UsePipes } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UserService } from './user.service';
import { User } from '../models/user.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * It is also possible to return rxjs' Observables like so:
   *
   * getAllUsers(): Observable<User[]> {
   *  return of(this.userService.getAllUsers());
   * }
   *
   * It is also possible to manipulate 'classic' express response:
   *
   * @Post()
   * create(@Res() res: Response) {
   *     res.status(HttpStatus.CREATED).send();
   * }
   *
   */

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() user: UserDto): User {
    return this.userService.createUser(user);
  }

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string): User {
    return this.userService.getOneUser(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDto): User {
    return this.userService.updateUser(+id, updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(+id);
  }
}
