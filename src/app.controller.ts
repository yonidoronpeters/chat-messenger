import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('message-form')
  root() {
    return { title: this.appService.welcome(), messages: this.appService.getMessages() };
  }

  @Post('form')
  @Render('message-form')
  sendMessage(@Body() dto: MsgDto) {
    this.appService.postMessage(dto.message);
    return this.root()
  }

  @Get('messages')
  getMessages(): string[] {
    return this.appService.getMessages() ;
  }
}
