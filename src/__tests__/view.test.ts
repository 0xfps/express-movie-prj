import viewController from "../controllers/view"
import movies from "../db/schema/movies"
import { emptyArray } from "../utils/empty"

jest.mock("../db/schema/movies")
jest.mock("../utils/empty")

it("should return 300 due to empty list", async () => {
    // @ts-ignore
    emptyArray.mockImplementationOnce((x: Array<object>) => true)

    const req = {}

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(({ success: x, msg: y }) => ({
            success: x,
            msg: y
        }))
    }

    // @ts-ignore
    movies.find.mockImplementationOnce(() => [])

    await viewController(req, res)

    expect(res.status).toBeCalledWith(300)
    expect(emptyArray).toBeCalledTimes(1)
    expect(movies.find).toBeCalledTimes(1)
})

it("should return a view", async () => {
    // @ts-ignore
    emptyArray.mockImplementationOnce((x: Array<object>) => false)

    const req = {}

    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(({ success: x, msg: y }) => ({
            success: x,
            msg: y
        }))
    }

    // @ts-ignore
    movies.find.mockImplementationOnce(() => [
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
    ])

    await viewController(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(emptyArray).toBeCalledTimes(1)
    expect(movies.find).toBeCalledTimes(1)
})