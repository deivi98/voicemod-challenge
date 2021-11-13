import { Session, SessionData } from "express-session"
import { User } from "../database/entity/User"

export type Context = {
    user: User,
    req: Request & { session: Session & Partial<SessionData> & { userId?: String } }
    res: Response
}
