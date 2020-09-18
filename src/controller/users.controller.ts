import { Body, Controller, Delete, Get, Post, Param, Put } from '@nestjs/common';
import{ } from '@nestjs/platform-express'
import { UsersService } from '../service/users.service';
import { CreateUserDTO, GetUserDTO } from '../dtos/UserDTO';
import { User } from '../entities/user.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get()
  findByID(id: string): Promise<User> {
    return this.usersService.findByID(id);
  }

  @Get()
  findEmail(@Body() body: GetUserDTO): Promise<User> {
    const { email } = body;
    return this.usersService.findEmail(email);
  }

  @Post()
  create(@Body() body: CreateUserDTO): Promise<User> { 
    const { name, email, password } = body;

    return this.usersService.create({name, email, password});
  }

  @Put()
  Update( @Body() body: CreateUserDTO): Promise<string> {
    const user = body;

    return this.usersService.update(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
