import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DataRegisterInputs {
    @Field({ nullable: false })
    name: string

    @Field({ nullable: false })
    email: string

    @Field({ nullable: false })
    password: string
}