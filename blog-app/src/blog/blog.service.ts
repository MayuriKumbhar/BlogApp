import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { BlogsFilter } from './blog.filter';
import { BlogRepository } from './blog.repository';
import { BlogInputType } from './types/blog.input';

@Injectable()
export class BlogService {
  constructor(
    //add the dependency for BlogRepository
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
  ) {}

  async createBlog(input: BlogInputType, user: UserEntity) {
    return this.blogRepository.createBlog(input, user);
  }

  async updateBlog(input: BlogInputType) {
    return this.blogRepository.updateBlog(input);
  }

  async createupdateBlog(input: BlogInputType, user: UserEntity) {
    return this.blogRepository.createupdateBlog(input, user);
  }

  async getBlogById(id: string) {
    return this.blogRepository.getBlogbyId(id);
  }

  async deleteBlog(id: string) {
    // try deleting the blog with id
    const result = await this.blogRepository.delete(id);

    // if affected rows are > 0 -> success
    if (result.affected == 0) {
      throw new NotFoundException('blog not found');
    }

    return result;
  }

  async allBlogs(args: BlogsFilter) {
    return this.blogRepository.allBlogs(args);
  }
}
