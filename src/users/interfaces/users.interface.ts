import { Document } from 'mongoose';

export interface Users extends Document {
  readonly userId: string;
  readonly username: string;
  readonly password: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
