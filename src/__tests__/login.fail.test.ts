import loginController from "../controllers/login"
import users from "../db/schema/users"
import { empty } from "../utils/empty"
import { hashPassword, verifyPassword } from "../utils/hash"

jest.mock("../db/schema/users")

jest.mock("../utils/empty")

jest.mock("../utils/hash", () => ({
    hashPassword: jest.fn((x) => "hashhahha"),
    verifyPassword: jest.fn((x, y) => x == y),
    getRandom: jest.fn(() => "a9ieqipj")
}))

const fakeReq = {
    body: {
        username: "antonio",
        password: "fakepass"
    },
    session: {
        userId: "none"
    }
}

const emptyReq = {
    body: {
        username: "",
        password: ""
    },
    session: {
        userId: "none"
    }
}

const fakeRes = {
    status: jest.fn((x) => x),
    send: jest.fn(() => ({
        success: "false",
        msg: "Invalid password!"
    })),
    cookie: jest.fn((x, y, z) => ({
        x: y
    }))
}

it("should call 500 for status because password is wrong", async () => {
    // @ts-ignore
    users.findOne.mockImplementationOnce(() => ({
        userId: "uiansjea",
        username: "antonio",
        email: "fakeemail",
        password: "aljdaijfoiqejapfjapmdfadofa/podfapfiapjoajpdiojap"
    }))

    await loginController(fakeReq, fakeRes)

    expect(fakeRes.status).toHaveBeenCalledWith(500)
})

it("should fail with inexistent username 400", async () => {
    // @ts-ignore
    users.findOne.mockImplementationOnce(() => null)

    await loginController(fakeReq, fakeRes)

    expect(fakeRes.status).toHaveBeenCalledWith(400)
})

// jest.mock("../utils/hash", () => ({
//     hashPassword: jest.fn((x) => "hashhahha"),
//     verifyPassword: jest.fn((x, y) => true),
//     getRandom: jest.fn(() => "a9ieqipj")
// }))

it("should log the user in", async () => {
    // @ts-ignore
    users.findOne.mockImplementationOnce(() => ({
        userId: "uiansjea",
        username: "antonio",
        email: "fakeemail",
        password: "fakepass"
    }))

    await loginController(fakeReq, fakeRes)

    expect(fakeRes.status).toHaveBeenCalledWith(200)
})