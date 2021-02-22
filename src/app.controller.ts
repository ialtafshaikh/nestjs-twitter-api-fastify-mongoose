import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/ocal-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
