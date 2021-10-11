import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import * as md5 from 'md5';
const defaultPassword = md5('123456');
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ default: 'static/avatar.png' })
  headImagePath: string;

  @CreateDateColumn()
  createTime: Date;

  @Column({ default: false })
  disable: boolean;

  @Column({ default: defaultPassword })
  password: string;
}
