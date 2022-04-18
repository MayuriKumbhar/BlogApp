import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { BlogTags } from '../blog.enum';

@InputType()
export class BlogInputType {
  @Field({ nullable: true })
  id: number;

  @Field()
  title: string;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  tags: BlogTags;
}
