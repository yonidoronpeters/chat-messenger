import dotenv from 'dotenv';
import { Message } from '../entity/message.entity';
import { ConnectionOptions } from 'typeorm';

dotenv.config();

const dbConfig: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    entities: [Message],
    synchronize: true,
};

export  = dbConfig;
