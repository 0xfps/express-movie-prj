import { Router } from "express"
import postController from "../controllers/post"

const postRoute: Router = Router()

postRoute.post("/", postController)

export default postRoute