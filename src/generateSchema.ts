import { buildSchema } from "type-graphql";
import { GraphQLSchema } from "graphql";
import { UserResolver } from "./graphql/resolvers/user";

export async function generateSchema(): Promise<GraphQLSchema> {
  try {
    const schema = await buildSchema({
      resolvers: [
        UserResolver
      ],
      validate: false,
    });

    return schema;
  } catch (e) {
    console.error(e);
    throw e;
  }
}