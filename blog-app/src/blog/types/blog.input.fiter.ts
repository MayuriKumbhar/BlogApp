import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { BlogTags } from '../blog.enum';

@InputType()
export class BlogTypeFilter {
  @Field({ nullable: true })
  tags: null | BlogTags;
}
