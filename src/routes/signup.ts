import { response, Router } from "express"
import signupController from "../controllers/signup"

const signupRoute = Router()

signupRoute.post("/signup", signupController)

export default signupRoute