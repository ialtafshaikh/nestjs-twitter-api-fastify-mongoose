import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { TweetService } from '../tweet.service';
import { Tweet } from '../interfaces/tweet.interface';
import { getModelToken } from '@nestjs/mongoose';

const mockTweetModel = () => ({});

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
});
