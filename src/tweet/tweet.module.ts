import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TweetSchema } from './models/tweet.model';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
