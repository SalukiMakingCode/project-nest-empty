import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../../shared/bcrypt/bcrypt.service';
import { NewUserDto, UsersDto } from '../../shared/dto/usersDto';
import { ErrorMessage, ErrorStatus } from '../../shared/enum/error.enum';
import { IsUserExistByMail } from '../verification/isUserExistByMail';
import { UsersEntity } from '../../shared/entities/user.entity';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
    private bcryptService: BcryptService,
    private isUserExistByMail: IsUserExistByMail,
  ) {}

  async addUser(newUser: NewUserDto): Promise<UsersDto> {
    if (await this.isUserExistByMail.isMailExist(newUser.email)) {
      throw new HttpException(ErrorMessage.EMAIL_ALLREADY_EXIST, ErrorStatus.EMAIL_ALLREADY_EXIST);
    }

    const hashPassword = await this.bcryptService.hash(newUser.password);

    const addUserRequest = await this.usersRepo.query(`INSERT INTO users (hashPassword, email)
    VALUES ('${hashPassword}', '${newUser.email}')`);

    return this.usersRepo.findOneOrFail({
      where: {
        id: addUserRequest.insertId,
      },
    });
  }
}
