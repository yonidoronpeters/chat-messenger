import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Message } from '../../entity/message.entity';
import { MessageService } from '../message.service';

export type MockType<T> = {
  [P in keyof T]: jest.Mock<any>;
};

describe('ProductsService', () => {
  let messageRepo: MockType<Pick<Repository<Message>, 'create' | 'save' | 'find'>> = {
    save: jest.fn(),
    create: jest.fn(),
    find: jest.fn(),
  };
  let service: MessageService;
  const msg = { username: 'Jon', text: 'hello', datetime: new Date() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(Message),
          useValue: messageRepo,
        },
      ],
    }).compile();

    await module.init();

    service = module.get<MessageService>(MessageService);
    messageRepo = module.get(getRepositoryToken(Message));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('saveMessage()', () => {
    it('saves a message to the repo successfully', async () => {
      const msgEntity = {}
      messageRepo.create.mockReturnValueOnce(msgEntity);

      expect(await service.saveMessage(msg)).toEqual(msg);
      expect(messageRepo.save).toBeCalledWith(msgEntity);
    });

    it('fails gracefully to create a message', async () => {
      messageRepo.create.mockImplementationOnce(() => {
        throw Error('error msg')
      });

      expect(await service.saveMessage(msg)).toEqual(msg);
      expect(messageRepo.save).not.toBeCalled();
    });

    it('fails gracefully to save a message', async () => {
      messageRepo.create.mockReturnValueOnce({});
      messageRepo.save.mockRejectedValueOnce(Error('error msg'));

      expect(await service.saveMessage(msg)).toEqual(msg);
    });
  });

  describe('getMessages()', () => {
    it('gets messages for the last number of configurable days', async () => {
      messageRepo.find.mockReturnValueOnce([msg]);

      expect(await service.getMessages()).toEqual([msg]);
      expect(messageRepo.find).toBeCalledWith({
        datetime: MoreThanOrEqual(expect.any(Date)),
      })
    });

    it('returns empty array when failing to get messages', async () => {
      messageRepo.find.mockRejectedValueOnce('error msg');

      expect(await service.getMessages()).toEqual([]);
    });
  })
})
