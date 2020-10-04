import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessageService } from './message.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly appService: MessageService) {
    this.users = 0;
  }

  @WebSocketServer()
  server;
  users;

  async handleConnection() {
    console.log('new user connected');
    this.users++;
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    console.log('user disconnected');
    this.users--;
    this.server.emit('users', this.users);
  }

  @SubscribeMessage('chat')
  async onChat(client, message: MsgDto) {
    console.log('received message', message);
    client.broadcast.emit('chat', message);
    await this.appService.saveMessage(message);
  }
}
