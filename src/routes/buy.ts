import { Router } from "express"
import buyController from "../controllers/buy"

const buyRoute: Router = Router()

// QUERY
buyRoute.post("/", buyController)

export default buyRoute