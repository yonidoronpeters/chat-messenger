import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

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
    this.appService.postMessage(dto);
    return this.root()
  }

  @Get('messages')
  getMessages(): MsgDto[] {
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
