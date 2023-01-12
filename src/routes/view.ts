import { Router } from "express"
import viewController from "../controllers/view"

const viewRoute: Router = Router()

// Returns a list of all movies in store.
viewRoute.get("/", viewController)

export default viewRoute