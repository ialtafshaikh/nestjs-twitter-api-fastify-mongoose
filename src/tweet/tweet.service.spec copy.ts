import { Test } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetService } from './tweet.service';
import { Model } from 'mongoose';
import { Tweet } from './interfaces/tweet.interface';
import { TweetSchema } from './models/tweet.model';

const mockUser = {
  username: 'altaf',
  userId: '8d02fde6-28d0-40cc-b530-9a16b59526aa',
};

const mockTweetService = () => ({
  getAllTweets: jest.fn(),
});

describe('TweetService', () => {
  //   let tweetController;
  let tweetService: TweetService;
  let tweetModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://altafshaikh:Awsed69@cluster0.wimdj.mongodb.net/nestApp?retryWrites=true&w=majority',
        ),
        MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
      ],
      //   controllers: [CatsController],
      providers: [{ provide: TweetService, useFactory: mockTweetService }],
    }).compile();

    tweetService = await moduleRef.resolve(TweetService);
    // tweetModel = moduleRef.get<Tweet>(Model);
  });

  describe('getAllTweets', () => {
    it('gets user tweets from the database', async () => {
      expect(tweetService.getAllTweets).not.toHaveBeenCalled();
      const result = await tweetService.getAllTweets(mockUser);
      expect(tweetService.getAllTweets).toHaveBeenCalled();
      expect(result).toEqual(result);
    });
  });
});
