import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<{ id: string; name: string }[]> {
    return this.appService.getHello();
  }

  @Post()
  postHello(@Body() body: any): Promise<{ id: string; name: string }> {
    return this.appService.postHello(body);
  }
}
