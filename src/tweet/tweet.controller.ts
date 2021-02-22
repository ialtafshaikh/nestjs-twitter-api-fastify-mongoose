import { Controller, Get } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { Tweet } from './interfaces/tweet.interface';

@Controller('api/v1/tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  async getAllTweets(): Promise<Tweet[]> {
    return this.tweetService.getAllTweets();
  }
}
