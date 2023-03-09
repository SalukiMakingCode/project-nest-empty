import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './shared/entities/user.entity';
import { SubscribeModule } from './users/subscribe/subscribe.module';
import { AuthModule } from './users/auth/auth.module';

@Module({
  imports: [
    SubscribeModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      port: 3306,
      password: '',
      database: 'auxmerveilles',
      entities: [UsersEntity],
      autoLoadEntities: true,
      synchronize: true,
      logging: 'all',
    }),
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
