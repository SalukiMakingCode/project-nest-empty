import { HttpException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../shared/entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../../shared/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { secret } from './secret';
import { ExtractJwt, Strategy as passPortJwtStrategy } from 'passport-jwt';
import { ErrorMessage, ErrorStatus } from '../../shared/enum/error.enum';
import { UserLoginDto, UserWithTokenDto } from '../../shared/dto/usersDto';

@Injectable()
export class AuthService extends PassportStrategy(passPortJwtStrategy) {
  constructor(
    @InjectRepository(UsersEntity) private userRepo: Repository<UsersEntity>,
    private readonly bcryptService: BcryptService,
    private readonly jwtServe: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async login(req: UserLoginDto): Promise<UserWithTokenDto> {
    const res = await this.userRepo
      .findOneOrFail({
        select: {},
        where: { email: req.login },
      })
      .catch(() => {
        throw new HttpException(ErrorMessage.USER_NOT_FOUND, ErrorStatus.USER_NOT_FOUND);
      });

    if (await this.bcryptService.compare(req.password, res.hashPassword)) {
      return { ...res, token: this.jwtServe.sign({ id: res.id }, { secret: secret }) };
    }

    throw new HttpException(ErrorMessage.AUTH_FAIL, ErrorStatus.AUTH_FAIL);
  }

  async validate(payload: any) {
    return { userId: payload.sub };
  }
}
