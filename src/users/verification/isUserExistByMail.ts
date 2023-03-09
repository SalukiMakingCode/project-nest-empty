import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../shared/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IsUserExistByMail {
  constructor(@InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>) {}

  async isMailExist(email: string): Promise<boolean> {
    return this.usersRepo
      .findOneOrFail({
        select: { id: true },
        where: { email: email },
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}
