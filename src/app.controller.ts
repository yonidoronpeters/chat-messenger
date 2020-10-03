import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('message-form')
  root() {
    return {
      title: this.appService.welcome(),
      messages: this.appService.getMessages(),
    };
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
