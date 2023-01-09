import { Router } from "express"
import movies from "../db/schema/movies"
import { emptyArray } from "../utils/empty"

const viewRoute: Router = Router()

// Returns a list of all movies in store.
viewRoute.get("/", async (req, res) => {
    const getAll: Array<object> = await movies.find({})

    if (emptyArray(getAll)){
        res.status(300)
        res.send({
            success: true,
            msg: "There are no movies at the moment"
        })

        return
    }

    res.status(200)
    res.send({
        success: true,
        msg: getAll
    })
})

export default viewRoute