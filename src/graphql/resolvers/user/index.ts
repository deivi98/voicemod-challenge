import { Resolver, Query, Arg, Mutation, Ctx } from "type-graphql";
import { User } from '../../../database/entity/User';
import { CreateUserInput } from "../../types/user/CreateUserInput";
import { UpdateUserInput } from "../../types/user/UpdateUserInput";
import { LoginUserInput } from "../../types/user/LoginUserInput";
import { Context } from "../../../context";
import * as bcrypt from "bcryptjs"

@Resolver()
export class UserResolver {

  @Query(() => User, { nullable: true })
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } });
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

    if(user) {
      throw new Error('Already logged in.');
    }

    const logUser = await User.getRepository().createQueryBuilder("user").addSelect("user.password").where({ email: data.email }).getOne()

    if (!logUser || !bcrypt.compareSync(data.password, logUser.password)) {
      throw new Error('Invalid login');
    }

    req.session.userId = logUser.id;
    return true;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, user }: Context) {
    if(!user) {
      throw new Error('You are not logged in');
    }

    delete req.session.userId
    return true
  }

  @Mutation(() => Boolean)
  async signup(
    @Arg("data") data: CreateUserInput,
    @Ctx() { user, req }: Context
  ) {

    if(user) {
      throw new Error('Already logged in.');
    }

    if(await User.findOne({ email: data.email })) {
      throw new Error('Email is in use');
    }

    data.password = bcrypt.hashSync(data.password, 10);

    const newUser = User.create(data);
    await newUser.save();

    req.session.userId = newUser.id;
    return true;
  }

  @Mutation(() => Boolean)
  async updateProfile(
    @Arg("data", () => UpdateUserInput) data: UpdateUserInput,
    @Ctx() { user }: Context
  ) {
    if (!user){
      throw new Error('You are not logged in');
    }

    if(data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }

    await User.getRepository().save({
      ...user,
      ...data
    });

    return true;
  }

  @Mutation(() => Boolean)
  async unregister(@Ctx() { user }: Context) {
    if (!user){
      throw new Error('You are not logged in');
    }
    await User.delete(user.id);
    return true;
  }
}
