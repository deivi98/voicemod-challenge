import { Resolver, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { Context } from "../../../Context"
import AuthenticationError from "../../../../utils/error/AuthenticationError"

@Resolver()
export class UnregisterResolver {

  /**
   * Unregister user
   * @param context apollo server context 
   * @returns unregister result
   */
  @Mutation(() => Boolean)
  async unregister(@Ctx() { req, user }: Context) {

    if (!user) {
      throw new AuthenticationError()
    }

    // Deletes user from DB
    await User.delete(user.id)

    // Removes logged user id from express session
    delete req.session.userId

    return true
  }

}
