import "reflect-metadata";
import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import  { generateSchema } from "../src/generateSchema";
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import express from "express";
import { User } from "./database/entity/User";
import { Context } from "./context"

dotenv.config();
async function main() {

  const app = express()
  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient({ host: 'redis', port: 6379 })

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
      },
      saveUninitialized: false,
      secret: 'voicemodSecret',
      resave: false
    })
  )

  const port = process.env.PORT;
  await createConnection()
  const schema = await generateSchema()
  const server = new ApolloServer({
    schema,
    context: async (context: Context) => {
      const id = context.req.session.userId;

      if (!id) {
        return context
      }

      const user = await User.findOne({ where: { id } });
      return {
        ...context,
        user
      };
    }
  })

  server.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`Server on port ${port}`);
  });
}

main()