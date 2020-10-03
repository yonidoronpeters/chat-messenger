import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  username: string;
  @Column()
  text: string;
  @CreateDateColumn()
  datetime: Date;
}
