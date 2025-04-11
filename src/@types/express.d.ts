import { User } from 'src/modules/users/interfaces/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
