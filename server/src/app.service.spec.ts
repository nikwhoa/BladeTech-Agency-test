import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AppService', () => {
  let service: AppService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: {
            list: {
              findMany: jest
                .fn()
                .mockResolvedValue([{ id: '1', name: 'Test Item' }]),
              create: jest
                .fn()
                .mockResolvedValue({ id: '2', name: 'New Item' }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getHello', () => {
    it('should return all list items', async () => {
      const result = await service.getHello();
      expect(result).toEqual([{ id: '1', name: 'Test Item' }]);
      expect(prismaService.list.findMany).toHaveBeenCalled();
    });
  });

  describe('postHello', () => {
    it('should create a new list item', async () => {
      const newItem = { name: 'New Item' };
      const result = await service.postHello(newItem);

      expect(result).toEqual({ id: '2', name: 'New Item' });
      expect(prismaService.list.create).toHaveBeenCalledWith({
        data: newItem,
      });
    });
  });
});
