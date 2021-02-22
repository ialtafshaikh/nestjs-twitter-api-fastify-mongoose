import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { TweetService } from './tweet.service';
import { Tweet } from './interfaces/tweet.interface';
import { CreateTweetDto } from './dto/createTweet.dto';

@Controller('api/v1/tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get()
  async getAllTweets(): Promise<Tweet[]> {
    return this.tweetService.getAllTweets();
  }

  @Post()
  async createTweet(@Body() tweet: CreateTweetDto) {
    return this.tweetService.createTweet(tweet);
  }

  @Get(':tweetId')
  async getTweetById(@Param('tweetId') id: string): Promise<Tweet> {
    return this.tweetService.getTweetById(id);
  }

  @Patch(':tweetId')
  async updateTweetById(
    @Param('tweetId') id: string,
    @Body() tweet: CreateTweetDto,
  ): Promise<Tweet> {
    return this.tweetService.updateTweetById(id, tweet);
  }
}
