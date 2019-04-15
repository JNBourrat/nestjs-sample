import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from 'src/models/user.dto';

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
      const user: UserDto = {
        firstname: 'John',
        lastname: 'Doe',
        age: 19,
        city: 'San Francisco',
        email: 'doe.john@gmail.com',
        phone: '0681036896',
      };
      const result = [user];
      jest.spyOn(userService, 'getAllUsers').mockImplementation(() => result);

      expect(await userController.getAllUsers()).toBe(result);
    });
  });
});
