import { buildSchema } from "type-graphql"
import { GraphQLSchema } from "graphql"

/**
 * Reads all project GraphQL resolvers and generates
 * GraphQL schema out of them using TypeGraphQL
 * @returns Promise<GraphQLSchema>
 */
export async function generateSchema(): Promise<GraphQLSchema> {

  try {
    const schema = await buildSchema({
      resolvers: [__dirname + "/graphql/resolvers/**/*.ts"],
      emitSchemaFile: {
        path: __dirname + "/../schema.graphql",
        commentDescriptions: true,
      },
      validate: false,
    })

    return schema
  } catch (e) {
    console.error(e)
    throw e
  }

}
