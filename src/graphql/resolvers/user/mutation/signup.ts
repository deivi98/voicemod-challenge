import { Resolver, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../../database/entity/User'
import { CreateUserInput } from "../../../types/user/CreateUserInput"
import { Context } from "../../../Context"
import * as bcrypt from "bcryptjs"
import AuthenticatedError from "../../../../utils/error/AuthenticatedError"

@Resolver()
export class SignupResolver {

  @Mutation(() => Boolean)
  async signup(
    @Arg("data") data: CreateUserInput,
    @Ctx() { user, req }: Context
  ) {

    if (user) {
      throw new AuthenticatedError()
    }

    if (await User.findOne({ email: data.email })) {
      throw new Error('Email is in use')
    }

    data.password = bcrypt.hashSync(data.password, 10)

    const newUser = User.create(data)
    await newUser.save()

    req.session.userId = newUser.id
    return true
  }

}
