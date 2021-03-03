import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Tweet } from './interfaces/tweet.interface';
import { CreateTweetDto } from './dto/createTweet.dto';
import { AuthUserDto } from '../users/dto/authUser.dto';
import { ThrowErrorResponse } from '../users/exception/throwError.exception';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel('Tweet') private readonly tweetModel: Model<Tweet>,
  ) {}

  async getAllTweets(user: AuthUserDto): Promise<Tweet[]> {
    return await this.tweetModel
      .find({ author: user.userId }, '-_id -__v')
      .exec();
  }

  async createTweet(tweet: CreateTweetDto, user: AuthUserDto): Promise<Tweet> {
    tweet['tweetId'] = uuidv4();
    tweet['author'] = user.userId;
    let result;
    try {
      result = await this.tweetModel.create(tweet);
    } catch (Exception) {
      throw new ThrowErrorResponse(
        'Unable To Create Tweet At the Moment, kindly try again after sometimes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  async getTweetById(id: string): Promise<Tweet> {
    const tweet = await this.tweetModel
      .findOne({ tweetId: id }, '-_id -__v')
      .exec();
    if (!tweet) {
      throw new ThrowErrorResponse(
        'Invalid Tweet Id, No tweet Found',
        HttpStatus.NOT_FOUND,
      );
    }
    return tweet;
  }

  async updateTweetById(
    id: string,
    tweet: CreateTweetDto,
    user: AuthUserDto,
  ): Promise<Tweet | string> {
    const result = await this.tweetModel.findOneAndUpdate(
      { tweetId: id, author: user.userId },
      { message: tweet.message },
      {
        fields: { _id: 0, __v: 0 },
        useFindAndModify: false,
        new: true,
      },
    );
    if (result === null) {
      throw new ThrowErrorResponse(
        'Operation Not Allowed',
        HttpStatus.FORBIDDEN,
      );
    }
    return result;
  }

  async deleteTweetById(id: string, user: AuthUserDto) {
    const result = await this.tweetModel.findOneAndRemove(
      {
        tweetId: id,
        author: user.userId,
      },
      { projection: { _id: 0, __v: 0 }, useFindAndModify: false },
    );

    if (result === null) {
      throw new ThrowErrorResponse(
        'Operation Not Allowed',
        HttpStatus.FORBIDDEN,
      );
    }
    return {
      message: 'Tweet deleted successfully',
      status: 'success',
      result: result,
    };
  }
}
