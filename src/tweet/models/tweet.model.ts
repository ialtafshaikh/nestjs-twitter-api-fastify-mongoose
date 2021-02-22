import * as mongoose from 'mongoose';

export const TweetSchema = new mongoose.Schema(
  {
    tweetId: { type: String, required: true },
    author: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);
