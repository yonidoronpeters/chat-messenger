import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entity/message.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}
  // TODO make this configurable
  private days = 3;

  async saveMessage(message: MsgDto): Promise<MsgDto> {
    console.debug('Persisting message', message);
    try {
      const messageEntity = this.messageRepo.create(message);
      await this.messageRepo.save(messageEntity);
    } catch (error) {
      // Note: it is usually better to surface errors for visibility rather to just logging and swallowing them
      console.error('Error while trying to persist message: ', error);
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
      console.error('Error occurred while trying to get messages: ', error);
      return [];
    }
  }
}
