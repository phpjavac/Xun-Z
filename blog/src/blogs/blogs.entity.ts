import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';
@Entity()
export class Blog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user: string;

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column('text')
  content: string;

  /**
   * Blog 作为主表，joinTable加在了Blog类上
   * Tag 作为副表
   * 当删除 Blog或Tag时，都会触发关联表 blog_tag 的外键，删除对应关联数据
   * 当编辑 Blog时，外键没有被删除，不会自动更新关联表数据。此时需要手动根据relation更新对应关联表数据
   */
  @ManyToMany(() => Tag, (tag) => tag.id)
  @JoinTable({
    name: 'blog_tag',
    joinColumn: {
      name: 'blogId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags: Tag[];
}
