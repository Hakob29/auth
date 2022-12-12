import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DataLoginInputs {

    @Field({nullable: false})
    email: string

    @Field({nullable: false})
    password: string
}