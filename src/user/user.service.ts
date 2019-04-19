import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import * as faker from 'faker/locale/fr';
import { User } from 'src/models/user.interface';
import { UserDto } from 'src/models/user.dto';
import { ConfigService } from '../config/config-service';
import { MyLogger } from '../middlewares/logger.middleware';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService {
  private users: User[] = new Array<User>();
  private readonly logger = new MyLogger(UserService.name);

  constructor(private config: ConfigService) {
    this.logger.warn(`Env: ${this.config.get('TEST')}`);
    for (let i = 0; i < 21; i++) {
      const newUser: User = {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        city: faker.address.city(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        age: Math.floor(Math.random() * 95 + 1),
        id: i + 1,
        creationDay: faker.date.past(),
        password: process.env.NODE_ENV === 'dev' ? 'password' : faker.internet.password(),
      };
      this.users.push(newUser);
    }
  }

  getAllUsers(): Observable<UserDto[]> {
    return this.getUsersFromDb();
  }

  getUsersFromDb(): Observable<User[]> {
    const users$ = new Observable<User[]>(subscriber => {
      const userTable: User[] = new Array<User>();
      setTimeout(() => {
        userTable.push(...this.users);
        subscriber.next(userTable);
        subscriber.complete();
      }, 1000);
    });
    return users$;
  }

  createUser(userDto: UserDto): Observable<User> {
    const newUser: User = {
      ...userDto,
      id: this.getNewId(),
      creationDay: new Date(),
      password: 'password',
    };
    this.users.push(newUser);
    return of(newUser);
  }

  getNewId(): number {
    return this.users.length === 0 ? 1 : Math.max(...this.users.map(user => user.id)) + 1;
  }

  getUserById(id: number): Observable<User> {
    const returnedUser$ = this.users.find(user => user.id === id);
    if (!returnedUser$) {
      throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    return of(returnedUser$);
  }

  updateUser(id: number, updatedUser: UserDto): Observable<User> {
    const newUser: User = {
      ...updatedUser,
      id,
      creationDay: new Date(),
      password: faker.internet.password(),
    };
    const indexOldUser = this.users.findIndex(user => user.id === id);
    if (indexOldUser === -1) {
      throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    this.users[indexOldUser] = newUser;
    return of(newUser);
  }

  deleteUser(id: number) {
    const indexOldUser = this.users.findIndex(user => user.id === id);
    if (indexOldUser === -1) {
      throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    this.users.splice(indexOldUser, 1);
  }
}
