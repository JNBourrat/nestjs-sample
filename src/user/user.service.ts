import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { User } from 'src/models/user.interface';

@Injectable()
export class UserService {

  private users: User[] = new Array<User>();

  getAllUsers() {
    for (let i = 0; i < 21; i++) {
      const newUser: User = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        city: faker.address.city(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        lastConnection: faker.date.past(),
      };
      this.users.push(newUser);
    }
    return this.users;
  }
}
