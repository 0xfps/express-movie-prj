import mongoose from "mongoose"

const URL: string = "mongodb://127.0.0.1:27017/theatre"

mongoose
    .connect(URL)
    .then(() => console.log("Connected!"))
    .catch((err) => {
        throw err
    })