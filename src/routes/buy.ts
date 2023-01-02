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
    getFilms,
    decrementTotalFilms
} from "./info"

const buyRouter = Router()

buyRouter.use((req, res, next) => {
    IPs.push(req.ip)
    next()
})

buyRouter.get("/", (req, res) => {
    res.status(200).send({
        totalFilms: totalFilms,
        films: films
    })
})

// /api/buy/purchase?id=id&num=num&amount=amount
buyRouter.get("/purchase", (req, res) => {
    const { id, num, amount } = req.query

    const _id = Number(id)
    const _num = Number(num)
    const _amount = Number(amount)

    if (!isNaN(_id) && !isNaN(_num) && !isNaN(_amount)) {
        if (films.length > 0) {
            const oneFilm = films.find((v, i, a) => v.id == _id)
            console.log(oneFilm)

            if (oneFilm == undefined) {
                res.status(404).send("Film not found.")
            } else {
                if (oneFilm.available > 0) {
                    if (oneFilm.available > _num) {
                        if ((oneFilm.price * _num) < _amount) {
                            res.status(403).send("Price low.")
                        } else {
                            console.log("Bought")
                            decrementTotalFilms(_num)
                            incrementTotalCash((oneFilm.price * _num))
                            oneFilm.available -= _num
                        }
                    } else {
                        res.status(503).send("Number in stock less than purchase.")
                    }
                } else {
                    res.status(503).send("Film sold out.")
                }
            }
        } else {
            res.status(503).send("No films at the moment.")
        }
    } else {
        res.status(503).send("Invalid param.")
    }
})

buyRouter.get("/:id", (req, res) => {
    const { id } = req.params

    const _id = Number(id)

    if (!isNaN(_id)) {
        if (films.length > 0) {
            const oneFilm = films.find((v, i, a) => v.id == _id)
            console.log(oneFilm)
            if (oneFilm == undefined) {
                res.status(404).send("Film not found.")
            } else {
                console.log(oneFilm)
                res.status(200).send(oneFilm)
            }
        } else {
            res.status(503).send("No films at the moment.")
        }
    } else {
        res.status(503).send("Invalid param.")
    }
})

export default buyRouter