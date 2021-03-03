import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { Users } from '../../dist/users/interfaces/users.interface.d';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from '../app.module';
import { ThrowErrorResponse } from '../users/exception/throwError.exception';
import { HttpStatus } from '@nestjs/common';

const mockUser = {
  username: 'altaf3',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
  password: 'password',
};

const mockReturnUser = {
  username: 'altaf3',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
};

const mockSignupuser = {
  username: 'altaf3',
  password: 'password',
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersModel: Model<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          useFactory: async () => ({
            secretOrPrivateKey: 'secret',
            signOptions: {
              expiresIn: '24h',
            },
          }),
        }),
      ],
      providers: [
        UsersService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: getModelToken('Users'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    usersModel = module.get<Model<Users>>(getModelToken('Users')); // The getModelFunction just appends 'Model' to the Model name
    authService = module.get<AuthService>(AuthService);
  });

  it('auth service should be defined', () => {
    expect(AuthService).toBeDefined();
  });
  it('users service should be defined', () => {
    expect(UsersService).toBeDefined();
  });
  //   it('local strategy should be defined', () => {
  //     expect(LocalStrategy).toBeDefined();
  //   });
  //   it('jwt strategy should be defined', () => {
  //     expect(JwtStrategy).toBeDefined();
  //   });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user object with username and userID', async () => {
      jest.spyOn(usersModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockUser),
      } as any);

      const foundUser = await authService.validateUser(
        mockUser.username,
        mockUser.password,
      );

      expect(foundUser).toEqual(mockReturnUser);
    });

    it('should not contain password in user object', async () => {
      jest.spyOn(usersModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const foundUser = await authService.validateUser(
        mockUser.username,
        mockUser.password,
      );
      expect(foundUser).not.toEqual(mockUser);
    });

    it('should Throw BAD REQUEST Error Response if password not match', async () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockReturnValue(
          new ThrowErrorResponse(
            'Incorrect Password',
            HttpStatus.BAD_REQUEST,
          ) as any,
        );

      const result = await authService.validateUser(
        mockUser.username,
        'randompass',
      );
      expect(result).toStrictEqual(
        new ThrowErrorResponse('Incorrect Password', HttpStatus.BAD_REQUEST),
      );
    });

    it('should Throw NOT FOUND Error Response if username is not valid', async () => {
      jest
        .spyOn(authService, 'validateUser')
        .mockReturnValue(
          new ThrowErrorResponse(
            'Invalid Username, User Not Found',
            HttpStatus.NOT_FOUND,
          ) as any,
        );

      const result = await authService.validateUser(
        'randomuser',
        mockUser.password,
      );
      expect(result).toStrictEqual(
        new ThrowErrorResponse(
          'Invalid Username, User Not Found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('login & Signup', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return jwt token on successful authentication', async () => {
      //   jest.spyOn(authService, 'login').mockReturnValue(mockToken as any);
      const jwt = await authService.login(mockUser);
      const tokenOwner = await authService.verifyToken(jwt.access_token);
      expect(tokenOwner.username).toEqual(mockUser.username);
      expect(tokenOwner.sub).toEqual(mockUser.userId);
    });

    it('should signup and return new user', async () => {
      jest.spyOn(authService, 'signup').mockReturnValue(mockSignupuser as any);
      const newUser = await authService.signup(mockSignupuser);
      expect(newUser.username).toBe(mockUser.username);
      expect(newUser.password).toBe(mockUser.password);
    });

    it('should not signup and should throw Username Already Exists', async () => {
      jest
        .spyOn(authService, 'signup')
        .mockReturnValue(
          new ThrowErrorResponse(
            'Username Already Exists',
            HttpStatus.BAD_REQUEST,
          ) as any,
        );
      await authService.signup(mockSignupuser);

      await expect(authService.signup(mockSignupuser)).toStrictEqual(
        new ThrowErrorResponse(
          'Username Already Exists',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
