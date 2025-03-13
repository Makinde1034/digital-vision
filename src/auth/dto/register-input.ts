import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  @Field()
  password: string;
}
