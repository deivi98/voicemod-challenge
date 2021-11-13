import { Resolver, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { Context } from "../../../Context"
import AuthenticationError from "../../../../utils/error/AuthenticationError"

@Resolver()
export class UnregisterResolver {

  @Mutation(() => Boolean)
  async unregister(@Ctx() { user }: Context) {
    if (!user) {
      throw new AuthenticationError()
    }
    await User.delete(user.id)
    return true
  }

}
