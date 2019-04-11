import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    // return `get all ok`
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string, @Req() request: Request) {
    return this.userService.getOneUser(+id);
  }

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updatedUser: UserDto) {
    // return `put ok with id: ${id} & ${JSON.stringify(updatedUser)}`;
    return this.userService.updateUser(+id, updatedUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
