import { InputType, Field } from "type-graphql"

@InputType()
export class CreateUserInput {

  @Field()
  email: string

  @Field()
  password: string

  @Field()
  name: string

  @Field({ nullable: true })
  surnames?: string

  @Field({ nullable: true })
  country?: string

  @Field({ nullable: true })
  phone?: string

  @Field({ nullable: true })
  postalCode?: number

}
