import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BlogTags } from '../blog.enum';

@ObjectType('Blog')
export class BlogType {
  @Field((type) => ID, { nullable: true })
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field({ nullable: true })
  tags: BlogTags;
}
