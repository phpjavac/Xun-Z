import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Blog } from './blogs.entity';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userCode: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @ManyToMany(() => Blog, (blog) => blog.id)
  blogs: Blog[];
}
