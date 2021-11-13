import { Resolver, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { UpdateUserInput } from "../../../types/user/UpdateUserInput"
import { Context } from "../../../Context"
import * as bcrypt from "bcryptjs"
import AuthenticationError from "../../../../utils/error/AuthenticationError"

@Resolver()
export class UpdateProfileResolver {

  @Mutation(() => Boolean)
  async updateProfile(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @Ctx() { user }: Context
  ) {
    if (!user) {
      throw new AuthenticationError()
    }

    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10)
    }

    await User.getRepository().save({
      ...user,
      ...data
    })

    return true
  }

}
