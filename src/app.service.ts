import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private messages: string[] = []
  welcome(): string {
    return 'Welcome to the messenger app. beep beep. churp..';
  }

  postMessage(message: string) {
    // persist msg
    this.messages.push(message)
    console.log(this.messages);
    return message;
  }

  getMessages() {
    console.log('fetching messages..');
    return this.messages;
  }
}
