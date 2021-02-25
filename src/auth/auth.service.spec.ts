import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Users } from '../../dist/users/interfaces/users.interface.d';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AppModule } from '../app.module';

const mockUser = {
  username: 'altaf',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
  password: 'password',
};

const mockReturnUser = {
  username: 'altaf',
  userId: 'e2d3cca3-c580-4098-8bb1-6f96363017f8',
};

const mockToken = {
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFsdGFmIiwic3ViIjoiZTJkM2NjYTMtYzU4MC00MDk4LThiYjEtNmY5NjM2MzAxN2Y4IiwiaWF0IjoxNjE0MDUxODY2LCJleHAiOjE2MTQxMzgyNjZ9.HV7WZQeHP5r_XASWY3kqjeZ0LhvhKL87IeZiy0Q9o4I',
};

const mockSignupuser = {
  username: 'altaf',
  password: 'password',
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
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
    usersService = module.get<UsersService>(UsersService);
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

    it('should return null if password not match', async () => {
      jest.spyOn(usersModel, 'findOne').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockUser),
      } as any);

      const foundUser = await authService.validateUser(
        mockUser.username,
        'randompass',
      );
      expect(foundUser).toBeNull();
    });
  });

  describe('login', () => {
    it('should return jwt token on successful authentication', async () => {
      //   jest.spyOn(authService, 'login').mockReturnValue(mockToken as any);
      const jwt = await authService.login(mockUser);
      const tokenOwner = await authService.verifyToken(jwt.access_token);
      expect(tokenOwner.username).toEqual(mockUser.username);
      expect(tokenOwner.sub).toEqual(mockUser.userId);
    });

    it('should signup and return new user', async () => {
      const newUser = await authService.signup(mockSignupuser);
      expect(newUser.username).toBe(mockUser.username);
      expect(newUser.password).toBe(mockUser.password);
    });
  });
});
