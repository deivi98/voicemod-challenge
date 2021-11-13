import { buildSchema } from "type-graphql"
import { GraphQLSchema } from "graphql"

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
