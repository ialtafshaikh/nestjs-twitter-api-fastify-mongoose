import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: UserDto) {
    user['userId'] = uuidv4();
    const createdUser = new this.usersService.usersModel(user);
    const result = await createdUser.save();
    const { _id, __v, createdAt, updatedAt, ...newUser } = result['_doc'];
    return newUser;
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
