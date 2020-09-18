import { HttpException, HttpStatus, Injectable, Get } from '@nestjs/common';
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

  async findEmail(email: string): Promise<any> {
    const userExists = await this.usersRepository.findOne({
      where: { email }
    })

    if (userExists) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }
  }

  async create({name, email, password}: CreateUserDTO): Promise<User> { 
    try {
      const user = this.usersRepository.create({name, email, password});
    
      await this.usersRepository.save(user);

      return user;
    } catch (err) {
      return await this.findEmail(email);
    }
  }

  async update({name, email, password}: CreateUserDTO): Promise<string> {
    await this.usersRepository.update('users', {name, email, password});

    return 'User updated';
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}