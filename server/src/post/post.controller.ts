import { Controller, Get, Post, Body } from '@nestjs/common';
import { Post as PostClient } from '@prisma/client';
import { PostService } from './post.service';
import { CreatePostDto } from './Dto/post.dto';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('/')
  async getPosts(): Promise<PostClient[]> {
    return await this.postService.getPosts();
  }

  @Post('/')
  async createPost(@Body() payload: CreatePostDto): Promise<PostClient> {
    return await this.postService.createPost(payload);
  }
}
