import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { lifetime } from './lifeTime';

@Entity('users')
export class UsersEntity extends lifetime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hashPassword: string;

  @Column({ length: 400 })
  email: string;
}
