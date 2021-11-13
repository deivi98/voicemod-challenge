import { Resolver, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { LoginUserInput } from "../../../types/user/LoginUserInput"
import { Context } from "../../../Context"
import * as bcrypt from "bcryptjs"
import AuthenticatedError from "../../../../utils/error/AuthenticatedError"
import InvalidLoginError from "../../../../utils/error/InvalidLoginError"

@Resolver()
export class LoginResolver {

  /**
   * User login mutation resolver
   * @param data login input
   * @param context apollo server context
   * @returns login result
   */
  @Mutation(() => Boolean)
  async login(
    @Arg("data") data: LoginUserInput,
    @Ctx() { user, req }: Context
  ) {

    if (user) {
      throw new AuthenticatedError()
    }

    // Search for user by email in database. Adds password to select explicitely so that it is returned instead of null
    const logUser = await User.getRepository().createQueryBuilder("user").addSelect("user.password").where({ email: data.email }).getOne()

    // Validates login
    if (!logUser || !bcrypt.compareSync(data.password, logUser.password)) {
      throw new InvalidLoginError()
    }

    // Sets logged user id to express session
    req.session.userId = logUser.id
    
    return true
  }

}
