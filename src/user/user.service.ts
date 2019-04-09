import { Injectable } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { User } from 'src/models/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly users: User[]) {
    for (let i = 0; i < 21; i++) {
      const newUser = {
        lastname: faker.name.lastName() as string,
        firstname: faker.name.firstName() as string,
        city: faker.adress.city() as string,
        email: faker.internet.email() as string,
        phone: faker.phone.phoneNumber() as string,
      };
      this.users.push(newUser);
    }
  }

  getAllUsers() {
    return this.users;
  }
}
