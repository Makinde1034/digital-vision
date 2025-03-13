import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/user.entity';
import { IsNotEmpty,  IsString } from 'class-validator';
import { isNullableType } from 'graphql';

@ObjectType()
// login response fields 
export class LoginResponse {
  @IsString()
  @IsNotEmpty()
  @Field()
  accessToken: string;
 

  @IsString()
  @IsNotEmpty()
  @Field(() => User)
  user: User;
}
