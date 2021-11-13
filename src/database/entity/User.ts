import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"
import { ObjectType, Field, ID } from "type-graphql"

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string

  @Field(() => String)
  @Column({ unique: true })
  email: string

  @Field(() => String, { nullable: true })
  @Column({ select: false })
  password: string

  @Field(() => String)
  @Column()
  name: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  surnames?: string

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  country?: string

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  phone?: string

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  postalCode?: number
}