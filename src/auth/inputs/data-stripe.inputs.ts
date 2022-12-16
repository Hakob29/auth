import { Field, InputType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@InputType()
export class DataStripeInputs {

    @Field(() => User)
    user: User
}