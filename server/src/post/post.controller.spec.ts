import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../prisma.service';

describe('PostController', () => {
  let controller: PostController;
  let prisma: PrismaService;

  const result = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'test title',
    textBody: 'test text body',
  };

  const mockPostService = {
    createPost: jest.fn(() => result),
    getPosts: jest.fn(() => [result]),
  };

  const mockPrismaService = {
    post: {
      findMany: () => Promise.resolve([]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new post', async () => {
    const dto = {
      title: 'test title',
      text_body: 'test text body',
    };

    expect(await controller.createPost(dto)).toEqual(result);

    expect(mockPostService.createPost).toHaveBeenCalledWith(dto);
  });

  it('should get all posts', async () => {
    prisma.post.findMany = jest.fn().mockReturnValueOnce([result]);

    expect(await controller.getPosts()).toEqual([result]);

    expect(mockPostService.getPosts).toHaveBeenCalled();
  });
});
