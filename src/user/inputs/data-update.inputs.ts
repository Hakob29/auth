import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DataUpdateInputs {

      @Field({ nullable: false })
      name: string

      @Field({ nullable: false })
      email: string

      @Field({ nullable: false })
      password: string

}
