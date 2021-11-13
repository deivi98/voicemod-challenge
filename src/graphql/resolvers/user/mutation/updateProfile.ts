import { Resolver, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { UpdateUserInput } from "../../../types/user/UpdateUserInput"
import { Context } from "../../../Context"
import * as bcrypt from "bcryptjs"
import AuthenticationError from "../../../../utils/error/AuthenticationError"

@Resolver()
export class UpdateProfileResolver {

  /**
   * Update user profile
   * @param data update user input
   * @param context apollo server context 
   * @returns update profile result
   */
  @Mutation(() => Boolean)
  async updateProfile(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @Ctx() { user }: Context
  ) {

    if (!user) {
      throw new AuthenticationError()
    }

    // If password is updated, make sure it is hashed before storing it in DB
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10)
    }

    // Updates and saves user
    await User.getRepository().save({
      ...user,
      ...data
    })

    return true
  }

}
