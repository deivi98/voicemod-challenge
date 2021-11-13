import "reflect-metadata"
import * as dotenv from "dotenv"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { generateSchema } from "./generateSchema"
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import express from "express"
import { requestContext } from "./graphql/Context"

// Enable .env variables
dotenv.config()

/**
 * This funciton initializes API
 */
async function main() {

  // Create RedisStore to save user sessions
  const RedisStore = connectRedis(session)
  // Create redis client to connect redis server
  const redisClient = redis.createClient({ host: 'redis', port: 6379 })

  // Await TypeORM to connect to database
  await createConnection()

  // Initialize express app (root app)
  const app = express()

  // Add sessions to express using RedisStore
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: 1000 * 60 * 60,     // 1 hour cookie life
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      },
      saveUninitialized: false,
      secret: 'voicemodSecret',
      resave: false
    })
  )

  // Await schema to be generated by TypeGraphQL
  const schema = await generateSchema()

  // Initialize Apollo GraphQL server
  const server = new ApolloServer({
    schema,
    context: requestContext         // We use our own context request function
  })

  // Connect express as middleware for apollo
  server.applyMiddleware({ app, cors: false })

  const port = process.env.PORT

  app.listen(port, () => {
    console.log(`API is listening on http://localhost:${port}/graphql`)
  })
}

main()