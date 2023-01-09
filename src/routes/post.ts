import { Router } from "express"
import movies from "../db/schema/movies"
import { empty, emptyObject } from "../utils/empty"
import { getRandom } from "../utils/hash"

const postRoute: Router = Router()

postRoute.post("/", async (req, res) => {
    const { name, desc, price, quantity } = req.body
    const seller = req.session.userId
    const movieId = getRandom()

    const emptyName = empty(name)
    const emptyPrice = empty(price)
    const emptyDesc = empty(desc)
    const emptyQty = empty(quantity)

    if (
        emptyName || 
        emptyPrice || 
        emptyPrice || 
        emptyQty ||
        ((typeof price) != "number") ||
        ((typeof quantity) != "number")
        ) {
        res.status(300)
        res.send({
            success: false,
            msg: "Invalid data passed"
        })

        return
    }

    const newMovie = await movies.create({ movieId, name, desc, price, quantity})
    if (emptyObject(newMovie)) {
        res.status(500)
        res.send({
            success: false,
            msg: "Error creating a new movie"
        })
    } else {
        res.status(201)
        res.send({
            success: true,
            msg: newMovie
        })
    }
})

export default postRoute