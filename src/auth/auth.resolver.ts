import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { RegisterInput } from './dto/register-input';

import { LoginResponse } from './dto/login-response';
import { plainToInstance } from 'class-transformer';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  Register(@Args('registerInput') registerInput: RegisterInput) {
    console.log(registerInput, 'lll');

    return this.authService.createUser(registerInput);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello, World!';
  }
}
