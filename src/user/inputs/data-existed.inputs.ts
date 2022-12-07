import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class DataExistedInputs{

    @Field({nullable: false})
    email: string

    @Field({nullable: false})
    password : string

}
