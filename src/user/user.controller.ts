import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { UserDto } from '../models/user.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Get()
  getAllUsers() {
    // return `get all ok`
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id, @Req() request: Request) {
    return `get one ok with id: ${id}, & request: ${JSON.stringify(request.params)}`;
    // return userService.getOneUser(id);
  }

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Put(':id')
  updateUser(@Param('id') id, @Body() updatedUser: UserDto) {
    return `put ok with id: ${id} & ${updatedUser}`;
  }

  @Delete(':id')
  deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }
}
