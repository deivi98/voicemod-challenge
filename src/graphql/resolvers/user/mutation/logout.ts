import { Resolver, Mutation, Ctx } from "type-graphql"
import { Context } from "../../../Context"
import AuthenticationError from "../../../../utils/error/AuthenticationError"

@Resolver()
export class LogoutrResolver {

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, user }: Context) {
    if (!user) {
      throw new AuthenticationError()
    }

    delete req.session.userId
    return true
  }

}
