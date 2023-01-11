import signupController, { validateEmail, validatePassword } from "../controllers/signup"
import users from "../db/schema/users"
import "../utils/hash"
import { getRandom, hashPassword } from "../utils/hash"

jest.mock("../db/schema/users")

jest.mock("../utils/hash", () => ({
    hashPassword: jest.fn((pass) => "let's call this a hash"),
    getRandom: jest.fn(() => "randomxy")
}))

const fakeReq = {
    body: {
        username: "user",
        email: "email",
        password: "pass"
    },
    session: {
        userId: "none"
    }
}

const fakeReq2 = {
    body: {
        username: "username",
        email: "email@mail.com",
        password: "password"
    },
    session: {
        userId: "none"
    }
}

const fakeRes = {
    status: jest.fn((x) => x),
    send: jest.fn(() => ({
        success: "false",
        msg: []
    })),
    cookie: jest.fn((x, y, z) => ({
        x: y
    }))
}

it("should fail with a 500 because username is invalid", async () => {
    await signupController(fakeReq, fakeRes)

    expect(fakeRes.status).toBeCalledWith(500)
})

it("should fail with a 500 because email is invalid", async () => {
    await signupController(fakeReq, fakeRes)

    expect(fakeRes.status).toBeCalledWith(500)
})

it("should fail with a 500 because password is invalid", async () => {
    await signupController(fakeReq, fakeRes)

    expect(fakeRes.status).toBeCalledWith(500)
})

it("should fail with a 300 because user wasn't created", async () => {
    // @ts-ignore
    users.create.mockImplementationOnce(() => null)

    await signupController(fakeReq2, fakeRes)

    expect(fakeRes.status).toBeCalledWith(300)
})

it("should signup with a 200 because all is well", async () => {
    // @ts-ignore
    users.create.mockImplementationOnce(() => ({
        userId: getRandom,
        username: fakeReq2.body.username,
        email: fakeReq2.body.password,
        password: validatePassword
    }))

    await signupController(fakeReq2, fakeRes)

    expect(fakeRes.status).toBeCalledWith(201)
})