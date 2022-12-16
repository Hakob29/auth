import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class LoggedUserOutput {

  @Field({ nullable: true })
  access_token: string;

  @Field(() => User)
  user: User

}