import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register-input';
import { LoginResponse } from './dto/login-response';
import { BiometricLoginInput } from './dto/biometric-input';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: AuthService;

  const mockAuthService = {
    createUser: jest.fn().mockImplementation((registerInput: RegisterInput) => {
      return Promise.resolve({
        accessToken: 'mockAccessToken',
        user: { id: 1, email: registerInput.email },
      });
    }),
    login: jest.fn().mockImplementation((loginInput: RegisterInput) => {
      return Promise.resolve({
        accessToken: 'mockAccessToken',
        user: { id: 1, email: loginInput.email },
      });
    }),
    biometricLogin: jest.fn().mockImplementation((biometricInput: BiometricLoginInput) => {
      return Promise.resolve({
        accessToken: 'mockAccessToken',
        user: { id: 1, biometricKey: biometricInput.biometricKey },
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should register a user', async () => {
    const registerInput: RegisterInput = { email: 'test@example.com', password: 'password123' };
    await expect(resolver.Register(registerInput)).resolves.toEqual({
      accessToken: 'mockAccessToken',
      user: { id: 1, email: 'test@example.com' },
    });
  });

  it('should log in a user', async () => {
    const loginInput: RegisterInput = { email: 'test@example.com', password: 'password123' };
    await expect(resolver.Login(loginInput)).resolves.toEqual({
      accessToken: 'mockAccessToken',
      user: { id: 1, email: 'test@example.com' },
    });
  });

  it('should authenticate a user using biometric login', async () => {
    const biometricInput: BiometricLoginInput = { biometricKey: 'mockBiometricKey' };
    await expect(resolver.biometricLogin(biometricInput)).resolves.toEqual({
      accessToken: 'mockAccessToken',
      user: { id: 1, biometricKey: 'mockBiometricKey' },
    });
  });

  it('should return Hello, World!', () => {
    expect(resolver.sayHello()).toBe('Hello, World!');
  });
});
