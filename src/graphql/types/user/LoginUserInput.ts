import { InputType, Field } from "type-graphql"

/**
 * Defines data for user login input
 */
@InputType()
export class LoginUserInput {

  @Field()
  email: string

  @Field()
  password: string

}
