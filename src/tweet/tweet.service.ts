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

  async getAllTweets(user): Promise<Tweet[]> {
    return await this.tweetModel.find({ author: user.userId }).exec();
  }

  async createTweet(tweet: CreateTweetDto, user) {
    tweet['tweetId'] = uuidv4();
    tweet['author'] = user.userId;
    const createdTweet = new this.tweetModel(tweet);
    return await createdTweet.save();
  }

  async getTweetById(id: string): Promise<Tweet> {
    return await this.tweetModel.findOne({ tweetId: id }).exec();
  }

  async updateTweetById(
    id: string,
    tweet: CreateTweetDto,
    user,
  ): Promise<Tweet | string> {
    const result = await this.tweetModel.findOneAndUpdate(
      { tweetId: id, author: user.userId },
      { message: tweet.message },
      {
        fields: { _id: 0, __v: 0 },
        useFindAndModify: false,
      },
    );
    if ((await result) === null) {
      return JSON.stringify({ message: 'Operation Not Allowed' });
    }
    return result;
  }

  async deleteTweetById(id: string) {
    return await this.tweetModel.findOneAndRemove(
      { tweetId: id },
      { useFindAndModify: false },
    );
  }
}
