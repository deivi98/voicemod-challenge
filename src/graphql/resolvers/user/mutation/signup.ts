import { Resolver, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { CreateUserInput } from "../../../types/user/CreateUserInput"
import { Context } from "../../../Context"
import * as bcrypt from "bcryptjs"
import AuthenticatedError from "../../../../utils/error/AuthenticatedError"

@Resolver()
export class SignupResolver {

  /**
   * Signup user
   * @param data register input data
   * @param context apollo server context
   * @returns signup result
   */
  @Mutation(() => Boolean)
  async signup(
    @Arg("data") data: CreateUserInput,
    @Ctx() { user, req }: Context
  ) {

    if (user) {
      throw new AuthenticatedError()
    }

    // Check if other user is already using email
    if (await User.findOne({ email: data.email })) {
      throw new Error('Email is in use')
    }

    // Hashes password before storing in DB
    data.password = bcrypt.hashSync(data.password, 10)

    // Creates and saves user
    const newUser = User.create(data)
    await newUser.save()

    // Sets logged user id in express session
    req.session.userId = newUser.id
    
    return true
  }

}
