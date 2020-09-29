import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { AppService } from './app.service';


@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly appService: AppService) {
  }

  @WebSocketServer()
  server;
  users = 0;

  async handleConnection() {
    this.users++;
    this.server.emit('users', this.users);
  }

  async handleDisconnect() {
    this.users--;
    this.server.emit('users', this.users);

  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    console.log(`received message ${message}`)
    this.appService.postMessage(message)
    client.broadcast.emit('chat', message);
  }
}
