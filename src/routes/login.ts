import { Router } from "express"
import loginController from "../controllers/login"
import users from "../db/schema/users"
import { empty } from "../utils/empty"
import { verifyPassword } from "../utils/hash"

const loginRoute = Router()

loginRoute.post("/login", loginController)

export default loginRoute