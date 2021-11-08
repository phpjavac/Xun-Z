import { Test, TestingModule } from '@nestjs/testing';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

const ServiceProvider = {
  provide: BlogService,
  useValue: BlogController,
};

describe('AppController', () => {
  let appController: BlogController;
  let appService: BlogService;
  // let client: ClientProxy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [ServiceProvider],
    }).compile();
    // app = app.createNestApplication();
    await app.init();

    appService = app.get<BlogService>(BlogService);
    appController = app.get<BlogController>(BlogController);
  });

  describe('root', () => {
    it('测试获取test', async () => {
      expect(await appController.getTest()).toBe('test');
    });
  });
});
