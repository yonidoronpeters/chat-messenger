import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { MessageModule } from './message/message.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    MessageModule
  ]
})
export class AppModule {}
