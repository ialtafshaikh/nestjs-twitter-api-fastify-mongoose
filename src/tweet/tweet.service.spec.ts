import { Test, TestingModule } from '@nestjs/testing';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Tweet } from './interfaces/tweet.interface';

const mockUser = {
  username: 'altaf',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
};

const tweetArray = [
  {
    message: 'user tweet updated again',
    tweetId: '82d16e7b-f7c4-4e55-859d-7c73c69ab06c',
    author: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
    createdAt: '2021-02-23T03:45:50.656Z',
    updatedAt: '2021-02-23T04:18:13.852Z',
  },
  {
    message: 'this is user tweet 3',
    tweetId: '3f33199f-09b9-4f1d-828d-c82698de307f',
    author: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
    createdAt: '2021-02-23T04:28:51.217Z',
    updatedAt: '2021-02-23T04:28:51.217Z',
  },
  {
    message: 'this is user2 tweet ',
    tweetId: 'a1a904ea-e544-4a31-aa68-01d9aa9a54fa',
    author: 'c0fc8c5d-484c-4d21-83d9-d58fc5377e7c',
    createdAt: '2021-02-23T04:52:56.501Z',
    updatedAt: '2021-02-23T04:52:56.501Z',
  },
  {
    message: 'this is user2 tweet another',
    tweetId: 'efbd28fe-04ed-4109-82da-58c3b0f20d85',
    author: 'c0fc8c5d-484c-4d21-83d9-d58fc5377e7c',
    createdAt: '2021-02-23T05:38:51.645Z',
    updatedAt: '2021-02-23T05:38:51.645Z',
  },
];

const mockTweet = (
  message = 'user tweet updated again',
  tweetId = '82d16e7b-f7c4-4e55-859d-7c73c69ab06c',
  author = 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
  createdAt = '2021-02-23T03:45:50.656Z',
  updatedAt = '2021-02-23T04:18:13.852Z',
) => ({
  tweetId,
  author,
  message,
  createdAt,
  updatedAt,
});

describe('TweetService', () => {
  let tweetController: TweetController;
  let tweetService: TweetService;
  let tweetModel: Model<Tweet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetService,
        {
          provide: getModelToken('Tweet'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTweet()),
            constructor: jest.fn().mockResolvedValue(mockTweet()),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            findOneAndRemove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    tweetModel = module.get<Model<Tweet>>(getModelToken('Tweet')); // The getModelFunction just appends 'Model' to the Model name
    tweetService = module.get<TweetService>(TweetService);
    // tweetController = module.get<TweetController>(TweetController);
  });

  it('service should be defined', () => {
    expect(tweetService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return user specific tweets', async () => {
    jest.spyOn(tweetModel, 'find').mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValueOnce(
          tweetArray.filter((tweet) => tweet.author == mockUser.userId),
        ),
    } as any);
    const tweets = await tweetService.getAllTweets(mockUser);

    expect(tweets).toEqual(
      tweetArray.filter((tweet) => tweet.author == mockUser.userId),
    );
  });

  it('should create a new tweet', async () => {
    jest.spyOn(tweetModel, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        message: 'user mock tweet',
        tweetId: '82d16e7b-f7c4-4e55-859d-7c73c69ab06c',
        author: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
      }),
    );
    const newTweet = await tweetService.createTweet(
      {
        message: 'user mock tweet',
      },
      mockUser,
    );
    expect(newTweet).toEqual({
      message: 'user mock tweet',
      tweetId: '82d16e7b-f7c4-4e55-859d-7c73c69ab06c',
      author: mockUser.userId,
    });
  });

  it('should get single tweet by id', async () => {
    jest.spyOn(tweetModel, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockTweet()),
    } as any);
    const findMockTweet = mockTweet();
    const foundTweet = await tweetService.getTweetById(mockTweet().tweetId);
    expect(foundTweet).toEqual(findMockTweet);
  });
});
