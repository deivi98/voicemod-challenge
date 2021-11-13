import { Resolver, Query, Arg } from "type-graphql"
import { User } from '../../../../database/entity/User'

/**
 * User simple queries
 */
@Resolver()
export class UserQuery {

  /**
   * Find user by id
   * @param id user id
   * @returns User
   */
  @Query(() => User, { nullable: true })
  user(@Arg("id") id: string) {
    return User.findOne({ where: { id } })
  }

  /**
   * Return all users
   * @returns User array
   */
  @Query(() => [User])
  users() {
    return User.find()
  }
  
}
