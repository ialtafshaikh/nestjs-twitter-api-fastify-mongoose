import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);
