import { Resolver, Mutation, Ctx } from "type-graphql"
import { Context } from "../../../Context"
import AuthenticationError from "../../../../utils/error/AuthenticationError"

@Resolver()
export class LogoutrResolver {

  /**
   * User logout
   * @param context apollo server context
   * @returns logout result
   */
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, user }: Context) {

    if (!user) {
      throw new AuthenticationError()
    }

    // Removes logged user id from express session
    delete req.session.userId

    return true
  }

}
