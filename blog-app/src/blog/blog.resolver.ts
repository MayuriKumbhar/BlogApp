import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BlogType } from './types/blog.type';
import { BlogInputType } from './types/blog.input';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { GQLAuthGuard } from 'src/user/gql.authguard';
import { GetUser } from 'src/user/get.user.decorator';
import { UserEntity } from 'src/user/user.entity';
import { BlogsFilter } from './blog.filter';

@Resolver((of) => BlogType)
@UseGuards(GQLAuthGuard)
export class BlogResolver {
  constructor(private blogService: BlogService) {}

  @Query((returns) => BlogType)
  getBlog(@Args('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @Query((returns) => [BlogType])
  allBlogs(@Args('BlogFilter') args: BlogsFilter) {
    return this.blogService.allBlogs(args);
  }

  @Mutation((returns) => BlogType)
  @UsePipes(ValidationPipe)
  createBlog(@Args('input') input: BlogInputType, @GetUser() user: UserEntity) {
    return this.blogService.createBlog(input, user);
  }

  @Mutation((returns) => BlogType)
  updateBlog(@Args('input') input: BlogInputType) {
    return this.blogService.updateBlog(input);
  }

  @Mutation((returns) => BlogType)
  deleteBlog(@Args('id') id: string) {
    return this.blogService.deleteBlog(id);
  }

  @Mutation((returns) => BlogType)
  createupdateBlog(
    @Args('input') input: BlogInputType,
    @GetUser() user: UserEntity,
  ) {
    return this.blogService.createupdateBlog(input, user);
  }
}
