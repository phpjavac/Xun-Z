import {
  Entity,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

  @Column()
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column()
  title: string;

  @Column()
  content: string;
}
