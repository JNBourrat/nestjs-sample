import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { INestApplication } from '@nestjs/common';
import { UserDto } from 'src/models/user.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const user: UserDto = {
    firstname: 'John',
    lastname: 'Doe',
    age: 19,
    city: 'San Francisco',
    email: 'doe.john@gmail.com',
    phone: '0681036896',
  };
  const userService = { getAllUsers: () => ['user'] };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();
    app = module.createNestApplication();
    await app.init();
  });

  // beforeEach(async () => {
  //   const moduleFixture: TestingModule = await Test.createTestingModule({
  //     imports: [AppModule],
  //   }).compile();

  //   app = moduleFixture.createNestApplication();
  //   await app.init();
  // });

  it('/GET user', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect({
        data: userService.getAllUsers(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
