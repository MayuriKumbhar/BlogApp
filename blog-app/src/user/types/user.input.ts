import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @MinLength(5)
  @MaxLength(10)
  username: string;

  @Field()
  @MinLength(5)
  @MaxLength(10)
  password: string;
}
