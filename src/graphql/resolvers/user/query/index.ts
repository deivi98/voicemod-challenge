import { Resolver, Query, Arg } from "type-graphql"
import { User } from '../../../../database/entity/User'

@Resolver()
export class UserQuery {

  @Query(() => User, { nullable: true })
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } })
  }

  @Query(() => [User])
  users() {
    return User.find()
  }
  
}
