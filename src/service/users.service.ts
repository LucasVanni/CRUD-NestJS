import { Injectable, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { CreateUserDTO } from '../dtos/UserDTO'



@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByID(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create({name, email, password}: CreateUserDTO): Promise<User> { 
    try {
      const user = this.usersRepository.create({name, email, password});
    
      await this.usersRepository.save(user);

      return user;
    } catch (err) {
      return err;
    }
  }

  async update( id: string, {name, email, password}: CreateUserDTO): Promise<string> {
    await this.usersRepository.update(id, {name, email, password});

    

    return 'User updated';
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}