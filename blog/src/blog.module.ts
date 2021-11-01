import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { ConfigService } from './services/config/config.service';
import { BlogService } from './blog.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blogs/blogs.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...new ConfigService().get('sql'),
      entities: [Blog],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Blog]),
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    ConfigService,
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create(configService.get('user'));
      },
      inject: [ConfigService],
    },
  ],
})
export class BlogModule {}
