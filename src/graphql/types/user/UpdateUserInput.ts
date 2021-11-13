import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  surnames?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  postalCode?: number;
}