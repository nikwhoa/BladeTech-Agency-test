import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaClient) {}
  async getHello(): Promise<{ id: string; name: string }[]> {
    const list = await this.prisma.list.findMany();
    return list;
  }

  async postHello(body: any): Promise<{ id: string; name: string }> {
    const list = await this.prisma.list.create({
      data: {
        name: body.name,
      },
    });

    return { id: list.id, name: list.name };
  }
}
