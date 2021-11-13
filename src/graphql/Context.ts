import { Session, SessionData } from "express-session"
import { User } from "../database/entity/User"

export type Context = {
  user: User,
  req: Request & { session: Session & Partial<SessionData> & { userId?: String } }
  res: Response
}

export async function requestContext(context: Context) {
  const id = context.req.session.userId

  if (!id) {
    return context
  }

  const user = await User.findOne({ where: { id } })
  return {
    ...context,
    user
  }
}
