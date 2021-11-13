import { Resolver, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { LoginUserInput } from "../../../types/user/LoginUserInput"
import { Context } from "../../../Context"
import * as bcrypt from "bcryptjs"
import AuthenticatedError from "../../../../utils/error/AuthenticatedError"
import InvalidLoginError from "../../../../utils/error/InvalidLoginError"

@Resolver()
export class LoginResolver {

  @Mutation(() => Boolean)
  async login(
    @Arg("data") data: LoginUserInput,
    @Ctx() { user, req }: Context
  ) {

    if (user) {
      throw new AuthenticatedError()
    }

    const logUser = await User.getRepository().createQueryBuilder("user").addSelect("user.password").where({ email: data.email }).getOne()

    if (!logUser || !bcrypt.compareSync(data.password, logUser.password)) {
      throw new InvalidLoginError()
    }

    req.session.userId = logUser.id
    return true
  }

}
