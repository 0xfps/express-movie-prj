import express from "express"
import session from "express-session"
import signupRoute from "./routes/signup"
import "./db/index"

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

app.listen(PORT, () => console.log(`Server live on port ${PORT}!`))

app.use("/v1/auth", signupRoute)