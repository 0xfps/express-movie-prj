import movies from "../db/schema/movies"
import purchases from "../db/schema/purchases"
import { empty, emptyObject } from "../utils/empty"
import { getRandom } from "../utils/hash"

// @ts-ignore
const buyController = async (req, res) => {
    const { movieId, number, amount } = req.body

    // number: How many you're buying.
    // amount: How much you're paying.

    const emptyMovieID = empty(movieId)
    const emptyNumber = empty(number)
    const emptyAmount = empty(amount)

    if (
        emptyMovieID ||
        emptyNumber ||
        emptyAmount ||
        ((typeof number) != "number") ||
        ((typeof amount) != "number")
    ) {
        res.status(300)
        res.send({
            success: false,
            msg: "Invalid data passed"
        })

        return
    }

    // This is where the math maths.
    // Take it gently.
    // First, check if the movie to be bought exists.
    const requestedMovie = await movies.findOne({ movieId: movieId })

    if (!requestedMovie) {
        res.status(404)
        res.send({
            success: false,
            msg: "Movie inexistent"
        })

        return
    }

    // If movie exists, we extract the price and the number remaining (quantity).
    const priceOne: number = requestedMovie.price
    const quantityLeft: number = requestedMovie.quantity

    // If the number the user wants to buy is > the quantity left, break.
    if (number > quantityLeft) {
        res.status(300)
        res.send({
            success: false,
            msg: "You're buying more than is left"
        })

        return
    }

    // If the amount sent is not up to the price to be paid.
    if (amount < (priceOne * number)) {
        res.status(300)
        res.send({
            success: false,
            msg: `Payment not up to price. Trying to pay ${amount} for movies costing ${priceOne * number}`
        })

        return
    }

    // If all passes.
    // Reduce the quantity left by the number bought.
    const newQuantity = quantityLeft - number

    const pId = getRandom()
    const [purchaseId, buyerId, quantity, price] = [pId, req.session.userId, number, priceOne * number]

    // Record purchase.
    const newPurchae = await purchases.create({ purchaseId, buyerId, movieId, quantity, price })

    if (emptyObject(newPurchae)) {
        res.status(500)
        res.send({
            success: false,
            msg: "Error buying movie"
        })

        return
    }

    // Update movie record.
    const updateMovie = await movies.updateOne({ movieId: movieId }, { $set: { quantity: newQuantity } })
    if (emptyObject(updateMovie)) {
        res.status(500)
        res.send({
            success: false,
            msg: "Error updating records"
        })

        return
    }

    res.status(200)
    res.send({
        success: true,
        msg: `${number} copies of ${movieId} : ${requestedMovie.name} purchased successfully @ ${amount}.`
    })
}

export default buyController