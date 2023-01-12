import movies from "../db/schema/movies"
import { empty, emptyObject } from "../utils/empty"
import { getRandom } from "../utils/hash"

import postController from "../controllers/post"

jest.mock("../db/schema/movies")
jest.mock("../utils/empty")
jest.mock("../utils/hash")

// Test 1.
it("should receive 300 because it is called with empty body params", async () => {
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "random")
    // @ts-ignore
    empty.mockImplementationOnce(() => true)

    const req = {
        body: {
            name: "Avatar",
            desc: "A water movie",
            price: 8.8,
            quantity: 120
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: false,
            msg: "msg"
        }))
    }

    await postController(req, res)

    expect(res.status).toBeCalledWith(300)
})

// Test 2.
it("should receive a 300 because the price or qty is invalid", async () => {
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "random")
    // @ts-ignore
    empty.mockImplementationOnce(() => false)

    const req = {
        body: {
            name: "Avatar",
            desc: "A water movie",
            price: "",
            quantity: 120
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: false,
            msg: "msg"
        }))
    }

    await postController(req, res)

    expect(res.status).toBeCalledWith(300)
})

// Test 3.
it("should receive a 201 because a movie was created", async () => {
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "random")
    // @ts-ignore
    empty.mockImplementationOnce(() => false)

    const req = {
        body: {
            name: "Avatar",
            desc: "A water movie",
            price: 8.8,
            quantity: 120
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: true,
            msg: "msg"
        }))
    }

    // @ts-ignore
    movies.create.mockImplementationOnce(() => ({
        movieId: getRandom
    }))

    await postController(req, res)

    expect(res.status).toBeCalledWith(201)
})

// Test 3.
it("should receive a 500 because a movie was not created", async () => {
    // @ts-ignore
    getRandom.mockImplementationOnce(() => "random")
    // @ts-ignore
    empty.mockImplementationOnce(() => false)
    // @ts-ignore
    emptyObject.mockImplementationOnce(() => true)

    const req = {
        body: {
            name: "Avatar",
            desc: "A water movie",
            price: 8.8,
            quantity: 120
        },
        session: {
            userId: "userId"
        }
    }

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: true,
            msg: "msg"
        }))
    }

    // @ts-ignore
    movies.create.mockImplementationOnce(() => ({}))

    await postController(req, res)

    expect(res.status).toBeCalledWith(500)
})