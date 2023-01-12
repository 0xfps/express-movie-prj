import movies from "../db/schema/movies"
import { emptyArray } from "../utils/empty"

// @ts-ignore
const viewController = async (req, res) => {
    const getAll: Array<object> = await movies.find({})

    if (emptyArray(getAll)) {
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
}

export default viewController