import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { NewUserDto } from '../../shared/dto/usersDto';
import { SubscribeService } from './subscribe.service';

@Controller('users')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @Post('subscribe')
  addUser(@Body(ValidationPipe) newUser: NewUserDto): Promise<any> {
    return this.subscribeService.addUser(newUser);
  }
}
