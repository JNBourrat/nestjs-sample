import { Injectable, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { User } from 'src/models/user.interface';
import { UserDto } from 'src/models/user.dto';

@Injectable()
export class UserService {
  private users: User[] = new Array<User>();

  constructor() {
    for (let i = 0; i < 21; i++) {
      const newUser: User = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        city: faker.address.city(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        age: Math.floor(Math.random() * 95 + 1),
        id: i + 1,
      };
      this.users.push(newUser);
    }
  }

  getAllUsers() {
    return this.users;
  }

  createUser(userDto: UserDto): User {
    const newUser: User = {
      ...userDto,
      id: this.getNewId(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getNewId(): number {
    return this.users.length === 0 ? 1 : Math.max(...this.users.map(user => user.id)) + 1;
  }

  getOneUser(id: number): User {
    const returnedUser = this.users.find(user => user.id === id);
    if (!returnedUser) {
      throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return returnedUser;
  }

  updateUser(id: number, updatedUser: UserDto): User {
    const newUser: User = { ...updatedUser, id };
    const indexOldUser = this.users.findIndex(user => user.id === id);
    if (indexOldUser === -1) {
      throw new NotFoundException();  // OR throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    this.users[indexOldUser] = newUser;
    return newUser;
  }

  deleteUser(id: number) {
    const indexOldUser = this.users.findIndex(user => user.id === id);
    if (indexOldUser === -1) {
      throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    this.users.splice(indexOldUser, 1);
  }
}
