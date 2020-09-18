import { Injectable } from '@nestjs/common';
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

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByID(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  findEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email }
    })
  }

  async create({name, email, password} :CreateUserDTO): Promise<User> { 
    const user = this.usersRepository.create({name, email, password});
   
    await this.usersRepository.save(user);

    return user;
  }

  async update({name, email, password}: CreateUserDTO): Promise<string> {
    await this.usersRepository.update('users', {name, email, password});

    return 'User updated';
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}