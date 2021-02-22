import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Tweet } from './interfaces/tweet.interface';
import { CreateTweetDto } from './dto/createTweet.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel('Tweet') private readonly tweetModel: Model<Tweet>,
  ) {}

  async getAllTweets(): Promise<Tweet[]> {
    return await this.tweetModel.find().exec();
  }

  async createTweet(tweet: CreateTweetDto) {
    tweet['tweetId'] = uuidv4();
    tweet['author'] = 'altaf';
    const createdTweet = new this.tweetModel(tweet);
    return await createdTweet.save();
  }

  async getTweetById(id: string): Promise<Tweet> {
    return await this.tweetModel.findOne({ tweetId: id }).exec();
  }

  async updateTweetById(id: string, tweet: CreateTweetDto): Promise<Tweet> {
    return await this.tweetModel.findOneAndUpdate(
      { tweetId: id },
      { message: tweet.message },
      { new: true, useFindAndModify: false },
    );
  }
}
