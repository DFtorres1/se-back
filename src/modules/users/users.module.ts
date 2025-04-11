import { Module } from '@nestjs/common';
import { UsersHTTPModule } from 'src/modules/users/usershttp.module';
import { AuthService } from 'src/modules/users/providers/auth.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { UsersController } from 'src/modules/users/controllers/users.controller';
import { AuthController } from 'src/modules/users/controllers/auth.controller';

@Module({
  imports: [UsersHTTPModule],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService],
  exports: [AuthService, UsersService],
})
export class UsersModule {}
