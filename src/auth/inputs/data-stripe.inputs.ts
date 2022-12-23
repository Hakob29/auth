import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DataStripeInputs {

    @Field({ nullable: false })
    name: string

    @Field({ nullable: false })
    email: string

    @Field({ nullable: true })
    description: string
}