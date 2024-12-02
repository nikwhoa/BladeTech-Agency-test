import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto } from '../dto/create-list.dto';
import { List } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello(): Promise<List[]> {
    return this.prisma.list.findMany();
  }

  async postHello(data: CreateListDto): Promise<List> {
    return this.prisma.list.create({
      data: {
        name: data.name,
      },
    });
  }
}
