import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { UsersModules } from './modules/user.modules'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModules
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
