import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly appService: MessageService) {}

  @Get()
  root(): string {
    return 'Please visit https://cryptochatter-client.herokuapp.com to start chatting';
  }

  @Post('form')
  @Render('message-form')
  async sendMessage(@Body() dto: MsgDto) {
    await this.appService.saveMessage(dto);
    return this.root();
  }

  @Get('messages')
  async getMessages(): Promise<MsgDto[]> {
    return this.appService.getMessages();
  }
}
