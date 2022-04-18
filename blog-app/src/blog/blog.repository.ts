import { EntityRepository, Repository } from 'typeorm';
import { BlogEntity } from './blog.entity';
import { BlogInputType } from './types/blog.input';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { BlogsFilter } from './blog.filter';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  async createBlog(input: BlogInputType, user: UserEntity) {
    // create a row in the blog Table (BlogEntity)
    const blog = new BlogEntity();
    blog.title = input.title;
    blog.content = input.content;
    blog.tags = input.tags;

    // the logged in user will own the blog
    blog.user = user;

    // create a new row in the blog Table
    const result = await blog.save();

    return result;
  }

  async getBlogbyId(id: number) {
    // select * from Blog where id = {id}
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException('blog not found');
    }
    return blog;
  }

  async updateBlog(input: BlogInputType) {
    const blog = await this.getBlogbyId(input.id);
    blog.title = input.title;
    blog.content = input.content;
    blog.tags = input.tags;

    const result = await blog.save();

    return result;
  }

  async allBlogs(args: BlogsFilter) {
    if (args.filter.tags === null || args.filter.tags === undefined) {
      const blog = await this.find();

      if (blog) {
        return blog;
      } else {
        return null;
      }
    } else {
      const query = this.createQueryBuilder('blog');
      query.andWhere('blog.tags=:tags', { tags: args.filter.tags });
      const blog = query.getMany();

      if (blog) {
        return blog;
      } else {
        return 'No Blogs.';
      }
    }
  }

  async createupdateBlog(input: BlogInputType, user: UserEntity) {
    if (input.id == null || input.id == 0 || input.id == undefined) {
      return this.createBlog(input, user);
    } else {
      return this.updateBlog(input);
    }
  }
}
