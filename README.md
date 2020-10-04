## Description

This is a Messenger app server that starts up a chat WebSocket gateway and subscribes to the `chat` channel. It emits to the clients every time a new message is sent or a new user joins the chat room.

The server app is deployed to https://cryptochatter.herokuapp.com 

To start chatting, please use the client app deployed here https://cryptochatter-client.herokuapp.com


## Installation
This app requires an installation of PostgreSQL and configuration for the following properties
```bash
DATABASE=messenger
DATABASE_USER=messenger_user
DATABASE_PASSWORD=messenger_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
``` 
To build, run 
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
