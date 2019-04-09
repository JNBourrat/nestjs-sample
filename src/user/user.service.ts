import { Injectable, HttpStatus } from '@nestjs/common';
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
      firstname: userDto.firstname,
      lastname: userDto.lastname,
      city: userDto.city,
      email: userDto.email,
      phone: userDto.phone,
      id: this.getNewId(),
    };
    this.users.push(newUser);
    return newUser;
  }

  getNewId(): number {
    return this.users.length === 0 ? 1 : Math.max(... this.users.map(user => user.id)) + 1;
  }

  deleteUser(id: number) {
    const userIndex = this.users.findIndex(user => user.id === +id);
    this.users.splice(userIndex, 1);

    return HttpStatus.OK;
  }
}
