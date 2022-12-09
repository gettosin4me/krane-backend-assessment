import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './Dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  getPosts(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  createPost(payload: CreatePostDto): Promise<Post> {
    const { title, text_body: textBody } = payload;

    return this.prismaService.post.create({ data: { title, textBody } });
  }
}
