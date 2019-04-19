import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'src/models/user.interface';
import { of } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDto } from '../models/user.dto';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getAllUsers', () => {
    it('should return an array of userDto', async () => {
      const user: User = {
        firstname: 'John',
        lastname: 'Doe',
        age: 19,
        city: 'San Francisco',
        email: 'doe.john@gmail.com',
        phone: '0681036896',
        id: 1,
        creationDay: new Date(2018, 4, 15),
        password: 'password',
      };
      const result = [user];
      jest.spyOn(userService, 'getAllUsers').mockImplementation(() => of(result));

      expect(await userController.findAllUsers()).toBe(plainToClass(UserDto, result));
      expect(await userController.findAllUsers()).toBeInstanceOf(UserDto);
    });
  });
});
