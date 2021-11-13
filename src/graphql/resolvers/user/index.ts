import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql"
import { User } from '../../../database/entity/User'
import { CreateUserInput } from "../../types/user/CreateUserInput"
import { UpdateUserInput } from "../../types/user/UpdateUserInput"
import { LoginUserInput } from "../../types/user/LoginUserInput"
import { Context } from "../../context"
import * as bcrypt from "bcryptjs"
import AuthenticationError from "../../../utils/error/AuthenticationError"
import AuthenticatedError from "../../../utils/error/AuthenticatedError"
import InvalidLoginError from "../../../utils/error/InvalidLoginError"

@Resolver()
export class UserResolver {

  @Query(() => User, { nullable: true })
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } })
  }

  @Query(() => [User])
  users() {
    return User.find()
  }

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

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, user }: Context) {
    if (!user) {
      throw new AuthenticationError()
    }

    delete req.session.userId
    return true
  }

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

  @Mutation(() => Boolean)
  async unregister(@Ctx() { user }: Context) {
    if (!user) {
      throw new AuthenticationError()
    }
    await User.delete(user.id)
    return true
  }
}
