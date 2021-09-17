import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './services/user.service';

describe('UserController', () => {
  let appController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    appController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "createUser"', () => {
      expect(
        appController.createUser({
          code: '123',
          name: '张三',
          role: 'admin',
        }),
      ).toBe({
        code: '123',
        name: '张三',
        role: 'admin',
      });
    });
  });
});
