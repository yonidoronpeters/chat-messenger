import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}
  private days = 3;

  welcome(): string {
    return 'Welcome to the messenger app. beep beep. churp..';
  }

  async saveMessage(message: MsgDto): Promise<MsgDto> {
    console.debug('Persisting message', message);
    const messageEntity = this.messageRepo.create(message);
    try {
      await this.messageRepo.save(messageEntity);
    } catch (error) {
      console.error('Error while trying to persist message.', error);
    }
    return message;
  }

  async getMessages(): Promise<MsgDto[]> {
    const since = new Date();
    since.setDate(since.getDate() - this.days);
    console.log(`fetching messages for last ${this.days} days..`);
    try {
      const messages = await this.messageRepo.find({
        datetime: MoreThanOrEqual(since),
      });
      console.debug(messages);
      return messages;
    } catch (error) {
      console.error('Error occurred while trying to get messages', error);
      return [];
    }
  }
}
