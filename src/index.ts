import express, { json } from "express"
import postRouter from "./routes/post"
import buyRouter from "./routes/buy"
import "./routes/info"

const app = express()
const PORT: number = 3000

app.use(express.json())
app.use(express.urlencoded())
app.use("/api/buy", buyRouter)
app.use("/api/post", postRouter)

app.listen(PORT, () => console.log(`Movie server running!`))
