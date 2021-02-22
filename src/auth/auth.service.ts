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
    console.log('user', user);
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
    const createduser = new this.usersService.usersModel(user);
    return await createduser.save();
  }
}
