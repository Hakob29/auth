import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';

@ObjectType()
export class StripeCustomerOutput {

    @Field({ nullable: true })
    user_id: string;

    @Field({ nullable: true })
    name: string

}