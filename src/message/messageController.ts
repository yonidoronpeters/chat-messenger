import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly appService: MessageService) {}

  @Get()
  root(): string {
    return 'Please visit https://cryptochatter-client.herokuapp.com to start chatting';
  }

  @Get('messages')
  async getMessages(): Promise<MsgDto[]> {
    return this.appService.getMessages();
  }
}
