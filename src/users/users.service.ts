import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Users } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') public readonly usersModel: Model<Users>) {}

  async findUser(username: string) {
    return await this.usersModel.findOne({ username: username }).exec();
  }

  // async addUser(body){
  //   const createduser = new this.tweModel(tweet);
  //   return await createdTweet.save();
  //   return
  // }
}
