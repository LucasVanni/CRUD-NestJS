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
    const { email } = req.body;

    const userExists = await this.usersRepository.findOne({
      where: { email }
    })

    if (userExists) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }

    return next();
  }
}

