import {
  Entity,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  code: string;

  @Column()
  user: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column()
  title: string;

  @Column('text')
  content: string;
}
