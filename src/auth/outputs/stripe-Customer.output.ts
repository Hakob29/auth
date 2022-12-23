import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StripeCustomerOutput {

    @Field({ nullable: true })
    user_id: string;

    @Field({ nullable: true })
    name: string

}