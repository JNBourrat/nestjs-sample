import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { User } from 'src/models/user.interface';

describe('User Controller', () => {
  let userController: UserController;
  let userService: UserService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [UserController],
  //     providers: [],
  //   }).compile();

  // userController = module.get<UserController>(UserController);
  // });

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const user: User = {
        firstname: 'John',
        lastname: 'Doe',
        age: 19,
        city: 'San Francisco',
        email: 'doe.john@gmail.com',
        phone: '0681036896',
        id: 0,
      };
      const result = [user];
      jest.spyOn(userService, 'getAllUsers').mockImplementation(() => result);

      expect(await userController.getAllUsers()).toBe(result);
    });
  });
});
