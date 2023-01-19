import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"

const URI: string = "mongodb://127.0.0.1:27017/theatre"
// @ts-ignore
// const URI: string = process.env.MONGO_URI

mongoose
    .connect(URI)
    .then(() => console.log("Connected!"))
    .catch((err) => {
        throw err
    })