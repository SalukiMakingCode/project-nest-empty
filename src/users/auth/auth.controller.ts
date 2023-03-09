import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto, UserWithTokenDto } from '../../shared/dto/usersDto';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  login(@Body(ValidationPipe) req: UserLoginDto): Promise<UserWithTokenDto> {
    return this.authService.login(req);
  }
}
