import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import findByEmail from 'src/middlewares/findByEmail';
import FindByID from 'src/middlewares/findByID';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule]
})
export class UsersModules implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FindByID, findByEmail).forRoutes(
    {
      path: 'users',
      method: RequestMethod.POST
    },
    {
      path: 'users',
      method: RequestMethod.PUT
    })
  }
}