import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
//  registration fields 
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
