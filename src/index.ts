import express from "express"
import session from "express-session"
import cookieParser from "cookie-parser"
import signupRoute from "./routes/signup"
import "./db/index"
import { empty } from "./utils/empty"
import loginRoute from "./routes/login"
import viewRoute from "./routes/view"

const app = express()
const PORT: 3001 = 3001

declare module "express-session" {
    export interface SessionData {
        userId: string
    }
}

app.use(express.json())
app.use(express.urlencoded())
app.use(express.text())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.use(cookieParser())

app.listen(PORT, () => console.log(`Server live on port ${PORT}!`))

app.use("/v1/auth", signupRoute)
app.use("/v1/auth", loginRoute)
app.use("/v1/movies", viewRoute)

app.use((req, res, next) => {
    

    if (req.cookies.userId) {
        req.session.userId = req.cookies.userId
        res.cookie("userId", req.cookies.userId, {
            maxAge: 60 * 60 * 24 * 1000 // One day.
        })
    } else if (req.session.userId) {
        req.session.userId = req.session.userId
        res.cookie("userId", req.session.userId, {
            maxAge: 60 * 60 * 24 * 1000 // One day.
        })
    } else {
        res.status(404)
        res.send({
            success: false,
            msg: "Session expired"
        })
    }
})