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
  // injection using constructor => this will declare and instantiate the TweetService at the same place
  constructor(private readonly tweetService: TweetService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTweets(@Request() req: any): Promise<Tweet[]> {
    return this.tweetService.getAllTweets(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTweet(
    @Body() tweet: CreateTweetDto,
    @Request() req: any,
  ): Promise<Tweet> {
    return this.tweetService.createTweet(tweet, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':tweetId')
  async getTweetById(@Param('tweetId') id: string): Promise<Tweet> {
    return this.tweetService.getTweetById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':tweetId')
  async updateTweetById(
    @Param('tweetId') id: string,
    @Body() tweet: CreateTweetDto,
    @Request() req: any,
  ): Promise<Tweet | string> {
    return this.tweetService.updateTweetById(id, tweet, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':tweetId')
  async deleteTweetById(@Param('tweetId') id: string, @Request() req: any) {
    return this.tweetService.deleteTweetById(id, req.user);
  }
}
