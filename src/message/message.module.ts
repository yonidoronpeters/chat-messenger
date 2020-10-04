import { Module } from '@nestjs/common';
import { MessageController } from './messageController';
import { MessageService } from './message.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entity/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService, ChatGateway],
})
export class MessageModule {}
