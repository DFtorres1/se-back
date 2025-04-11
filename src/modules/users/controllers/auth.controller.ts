import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/modules/users/providers/auth.service';
import { LoginDto } from 'src/modules/users/dto/login.dto';
import { RegisterDto } from 'src/modules/users/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string } | null> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }
}
