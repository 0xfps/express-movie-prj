import { Router } from "express"
import { 
    users,
    idCounter,
    IPs,
    totalCash,
    films,
    totalFilms,
    incrementIdCounter,
    incrementTotalFilms,
    incrementTotalCash,
    Films
} from "./info"

const postRouter: Router = Router()

interface FilmUpload {
    name: string,
    title: string,
    desc: string,
    duration: number,
    price: number,
    available: number
}

postRouter.use((req, res, next) => {
    IPs.push(req.ip)
    next()
})

postRouter.post("/", (req, res) => {
    const {
        name,
        title,
        desc,
        duration,
        price,
        available
    } = req.body satisfies FilmUpload

    const movieId = idCounter + 1

    const newFilm: Films = {
        id: movieId,
        name: name,
        title: title,
        desc: desc,
        duration: duration,
        price: price,
        available: available
    } satisfies Films

    films.push(newFilm);

    incrementTotalFilms()
    incrementIdCounter()

    res.status(201).send(`${name} uploaded, priced at ${price} each for ${available} pieces`)
})

export default postRouter