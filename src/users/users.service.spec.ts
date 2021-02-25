import { UsersService } from './users.service';
import { Model } from 'mongoose';
import { Users } from './interfaces/users.interface';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = {
  username: 'altaf',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
  password: 'password',
};

describe('UsersService', () => {
  let usersService: UsersService;
  let usersModel: Model<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    usersModel = module.get<Model<Users>>(getModelToken('Users')); // The getModelFunction just appends 'Model' to the Model name
    usersService = module.get<UsersService>(UsersService);
  });

  it('users service should be defined', () => {
    expect(UsersService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should find user by username', async () => {
    jest.spyOn(usersModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);
    const foundTweet = await usersService.findUser(mockUser.username);
    expect(foundTweet).toEqual(mockUser);
  });
});
