import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseFilters, UsePipes, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UserService } from './user.service';
import { User } from '../models/user.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('user')
@UsePipes(ValidationPipe)
@UseFilters(new HttpExceptionFilter())
@UseGuards(RolesGuard)
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
  createUser(@Body() user: UserDto): User {
    return this.userService.createUser(user);
  }

  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id', new ParseIntPipe()) id: number): User { // String parsed into an integer value with built-in pipe
    return this.userService.getOneUser(+id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDto): User {
    return this.userService.updateUser(+id, updatedUser); // String converted into an integer value with parseInt shorthand
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles('admin') // For test purpose only: comment this line to deactivate the route guard 'role'
  deleteUser(@Param('id') id: string): void {
    return this.userService.deleteUser(parseInt(id, 10)); // String converted into an integer value with parseInt with radix arg
  }
}
