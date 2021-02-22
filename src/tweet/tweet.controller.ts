import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { TweetService } from './tweet.service';
import { Tweet } from './interfaces/tweet.interface';
import { CreateTweetDto } from './dto/createTweet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/v1/tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTweets(@Request() req): Promise<Tweet[]> {
    // console.log('auth user', req.user);
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

  @Delete(':tweetId')
  async deleteTweetById(@Param('tweetId') id: string) {
    return this.tweetService.deleteTweetById(id);
  }
}
