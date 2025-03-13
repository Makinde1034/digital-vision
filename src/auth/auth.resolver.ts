import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterInput } from './dto/register-input';
import { LoginResponse } from './dto/login-response';
import { BiometricLoginInput } from './dto/biometric-input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  Register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.createUser(registerInput);
  }

  @Mutation(() => LoginResponse)
  Login(@Args('loginInput') loginInput: RegisterInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => LoginResponse)
  biometricLogin(
    @Args('biometricLoginInput') biometricLoginInput: BiometricLoginInput,
  ) {
    return this.authService.biometricLogin(biometricLoginInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello, World!';
  }
}
