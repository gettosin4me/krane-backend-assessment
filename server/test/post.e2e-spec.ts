import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PostModule } from '../src/post/post.module';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/GET api/post`, async () => {
    return request(app.getHttpServer()).get('/api/post').expect(200);
  });
});
