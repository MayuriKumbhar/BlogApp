import { type } from 'os';
import { UserEntity } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BlogTags } from './blog.enum';

@Entity('Blog')
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  tags: BlogTags;

  @ManyToOne((type) => UserEntity, (user) => user.blogs, { eager: false })
  user: UserEntity;

  @Column()
  userId: number;
}
