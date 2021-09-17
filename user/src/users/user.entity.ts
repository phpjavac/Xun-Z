import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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
}
