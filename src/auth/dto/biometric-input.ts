import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class BiometricLoginInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  biometricKey: string;
}
