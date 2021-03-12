import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { TweetService } from '../tweet.service';
import { Tweet } from '../interfaces/tweet.interface';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = {
  username: 'altaf',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
};

const mockTweetModel = () => ({
  find: jest.fn(),
  exec: jest.fn(),
  create: jest.fn(),
});

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

describe('Tweet Service', () => {
  let tweetService: TweetService;
  let tweetModel: Model<Tweet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TweetService,
        { provide: getModelToken('Tweet'), useFactory: mockTweetModel },
      ],
    }).compile();

    tweetService = module.get<TweetService>(TweetService);
    tweetModel = module.get<Model<Tweet>>(getModelToken('Tweet')); // The getModelFunction just appends 'Model' to the Model name
  });

  it('tweet service & model should be defined', () => {
    expect(tweetService).toBeDefined();
    expect(tweetModel).toBeDefined();
  });

  describe('getAllTweets', () => {
    it('should return user specific tweets', async () => {
      jest.spyOn(tweetModel, 'find').mockReturnValue({
        exec: jest
          .fn()
          .mockResolvedValueOnce(
            tweetArray.filter((tweet) => tweet.author == mockUser.userId),
          ),
      } as any);

      expect(tweetModel.find).not.toHaveBeenCalled();
      const tweets = await tweetService.getAllTweets(mockUser);
      expect(tweetModel.find).toHaveBeenCalled();
      expect(tweets).toEqual(
        tweetArray.filter((tweet) => tweet.author == mockUser.userId),
      );
    });
  });
});
