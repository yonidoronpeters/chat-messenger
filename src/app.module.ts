import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import dbConfig from './config/db.config';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Message]),
  ],

  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
