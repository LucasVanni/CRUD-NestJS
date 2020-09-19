import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { NextFunction, Request, Response } from 'express';

@Injectable()
export default class EmailExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const currentUser = await this.usersRepository.findOne(id);

    if(!currentUser) {
      throw new HttpException('Usuário não existe', HttpStatus.BAD_REQUEST);
    } 

    await this.usersRepository.update(
      id, 
      {name, email, password}
    );

    return next();
  }
}

