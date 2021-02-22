import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './models/tweet.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class TweetModule {}
