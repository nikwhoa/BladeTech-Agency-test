import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        list: {
          findMany: jest
            .fn()
            .mockResolvedValue([{ id: '1', name: 'Test Item' }]),
          create: jest.fn().mockResolvedValue({
            id: '2',
            name: 'New Item',
          }),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect([{ id: '1', name: 'Test Item' }]);
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({ name: 'New Item' })
      .expect(201)
      .expect({ id: '2', name: 'New Item' });
  });
});
