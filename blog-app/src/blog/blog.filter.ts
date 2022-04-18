import { Field, InputType } from '@nestjs/graphql';
import { BlogTypeFilter } from './types/blog.input.fiter';

@InputType()
export class BlogsFilter {
  @Field({ nullable: true })
  filter?: BlogTypeFilter;
}
