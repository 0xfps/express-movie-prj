import buyController from "../controllers/buy"

import movies from "../db/schema/movies"
import purchases from "../db/schema/purchases"
import { empty, emptyObject } from "../utils/empty"
import { getRandom } from "../utils/hash"

jest.mock("../db/schema/movies")
jest.mock("../db/schema/purchases")
jest.mock("../utils/empty")
jest.mock("../utils/hash")

it("should fail with 300 because one of the req.body is empty", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 80
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => true)

    await buyController(req, res)

    expect(res.status).toBeCalledWith(300)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Invalid data passed"
    })
})

it("should fail with 300 because the numbers are not numbers", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: "ask",
            amount: "amt"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => true)

    await buyController(req, res)

    expect(res.status).toBeCalledWith(300)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Invalid data passed"
    })
})

it("should fail with 404 because requested movie is not found", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 80
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => false)
    // @ts-ignore
    movies.findOne.mockImplementationOnce(() => null)

    await buyController(req, res)

    expect(res.status).toBeCalledWith(404)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Movie inexistent"
    })
})

it("should fail with 300 because user is buying more than is left", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 80
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => false)
    // @ts-ignore
    movies.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 4
    }))

    await buyController(req, res)

    expect(res.status).toBeCalledWith(300)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "You're buying more than is left"
    })
})

it("should fail with 300 because amount is less than price", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 50
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => false)
    // @ts-ignore
    movies.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 15
    }))

    await buyController(req, res)

    expect(res.status).toBeCalledWith(300)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: `Payment not up to price. Trying to pay ${req.body.amount} for movies costing ${8 * req.body.number}`
    })
})

it("should fail with 500 because there was an error buying the movie", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 100
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => false)
    // @ts-ignore
    movies.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 15
    }))
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "randomxy")
    // @ts-ignore
    movies.create.mockImplementationOnce(() => ({}))
    /// @ts-ignore
    emptyObject.mockImplementationOnce(() => true)

    await buyController(req, res)

    expect(res.status).toBeCalledWith(500)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Error buying movie"
    })
})

it("should fail with 500 because records weren't updated", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 100
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => false)
    // @ts-ignore
    movies.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 15
    }))
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "randomxy")
    // @ts-ignore
    movies.create.mockImplementationOnce(() => ({
        movieId: "movieId"
    }))
    // @ts-ignore
    movies.updateOne.mockImplementationOnce(() => ({
        movieId: "movieId"
    }))
    /// @ts-ignore
    emptyObject
        // @ts-ignore
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)

    await buyController(req, res)

    expect(res.status).toBeCalledWith(500)
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Error updating records"
    })
})

it("should pass with 200 because all went well", async () => {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 100
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    }

    // @ts-ignore
    empty.mockImplementationOnce((val) => false)
    // @ts-ignore
    movies.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        name: "Avatar",
        price: 8,
        quantity: 15
    }))
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "randomxy")
    // @ts-ignore
    movies.create.mockImplementationOnce(() => ({
        movieId: "movieId"
    }))
    // @ts-ignore
    movies.updateOne.mockImplementationOnce(() => ({
        movieId: "movieId"
    }))
    /// @ts-ignore
    emptyObject
        // @ts-ignore
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)

    await buyController(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.send).toBeCalledWith({
        success: true,
        msg: `${req.body.number} copies of ${req.body.movieId} : Avatar purchased successfully @ ${req.body.amount}.`
    })
})