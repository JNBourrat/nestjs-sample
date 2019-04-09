import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { User } from 'src/models/user.interface';
import { identity } from 'rxjs';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers() {
    // return `get all ok`
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id) {
    return `get one ok with id: ${id}`;
    // return userService.getOneUser(id);
  }

  @Post()
  createUser(@Body() user: User) {
    return `create ok with user: ${user}`;
  }

  @Put(':id')
  updateUser(@Param('id') id, @Body() updatedUser: User) {
    return `put ok with id: ${id} & ${updatedUser}`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id) {
    return `delete ok with id: ${id}`;
  }
}
