import { Controller, Get, Post, Body, Put, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UserService } from './user.service';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { User } from 'src/models/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *
   * It is also possible to return rxjs' Observables like so :
   *
   * getAllUsers(): Observable<User[]> {
   *  return of(this.userService.getAllUsers());
   * }
   *
   */
  @Get()
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string, @Req() request: Request): User {
    return this.userService.getOneUser(+id);
  }

  @Post()
  createUser(@Body() user: UserDto): User {
    return this.userService.createUser(user);
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
