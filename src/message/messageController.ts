import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Render,
} from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly appService: MessageService) {}

  @Get()
  root(): { pong: string} {
    return { pong: 'hello world' };
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

  @Post('/login-user')
  async loginUser(@Body() dto: UserDto): Promise<UserDto> {
    console.log('validating username');
    if (dto.name?.trim()) {
      console.log(`${dto.name} is valid`);
      return dto;
    }
    console.log(`${dto.name} is invalid`);
    throw new BadRequestException(`${dto.name} is invalid`);
  }
}
