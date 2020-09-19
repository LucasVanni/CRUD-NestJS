import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EmailExistsMiddleware from 'src/middlewares/EmailExists';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule]
})
export class UsersModules implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(EmailExistsMiddleware).forRoutes({
      path: 'users', method: RequestMethod.POST
    })
  }
}