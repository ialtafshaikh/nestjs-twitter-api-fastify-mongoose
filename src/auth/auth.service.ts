import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { ThrowErrorResponse } from '../users/exception/throwError.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);

    if (user === null) {
      throw new ThrowErrorResponse(
        'Invalid Username, User Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
    if (user.password !== pass) {
      throw new ThrowErrorResponse(
        'Incorrect Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
    user['userId'] = uuidv4();
    const createdUser = new this.usersService.usersModel(user);
    let result;
    try {
      result = await createdUser.save();
    } catch (Exception) {
      if (Exception.code === 11000) {
        return new ThrowErrorResponse(
          'Username Already Exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      return new ThrowErrorResponse(
        'Unable to signup',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const { _id, __v, createdAt, updatedAt, ...newUser } = result['_doc'];
    return newUser;
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
}
