import { Document } from 'mongoose';

export interface Tweet extends Document {
  readonly tweetId: string;
  readonly author: string;
  readonly message: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
