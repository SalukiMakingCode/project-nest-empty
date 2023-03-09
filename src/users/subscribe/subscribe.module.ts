import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from '../../shared/bcrypt/bcrypt.service';
import { SubscribeController } from './subscribe.controller';
import { SubscribeService } from './subscribe.service';
import { IsUserExistByMail } from '../verification/isUserExistByMail';
import { UsersEntity } from '../../shared/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [SubscribeController],
  providers: [SubscribeService, BcryptService, IsUserExistByMail],
})
export class SubscribeModule {}
