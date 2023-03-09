import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class lifetime {
  @DeleteDateColumn()
  deleteAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
  @CreateDateColumn()
  createdAt: Date;
}
