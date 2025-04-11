import {
  Injectable,
  NestMiddleware,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { UsersService } from 'src/modules/users/providers/users.service';
import { TokenInterface } from 'src/shared/interfaces/token.interface';

@Injectable()
export class HeaderUserMiddleware implements NestMiddleware {
  constructor(private usersRepository: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new NotAcceptableException('Authorization header is not valid');
    }

    const tokenMatch = authHeader.match(/^Bearer\s+(\S+)$/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      throw new NotFoundException('Authorization token not found');
    }

    const decodedToken: TokenInterface | null = decode(
      token,
    ) as TokenInterface | null;

    if (!decodedToken || !decodedToken.userId) {
      throw new NotFoundException('Invalid token: userId not found');
    }

    const userId: number = decodedToken.userId;

    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    req.push(user)
    next();
  }
}
