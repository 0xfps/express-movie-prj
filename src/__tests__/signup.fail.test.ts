import signupController from "../controllers/signup"
import users from "../db/schema/users"
import "../utils/hash"

jest.mock("../db/schema/users")

jest.mock("../utils/hash", () => ({
    hashPassword: jest.fn((pass) => "let's call this a hash"),
    getRandom: jest.fn(() => "randomxy")
}))

const fakeReq = {
    body: {
        username: "User",
        email: "email",
        password: "pass"
    }
}

const fakeRes = {
    status: jest.fn((x) => x),
    send: jest.fn(() => ({
        success: "false",
        msg: []
    }))
}

it("should fail with a 500", async () => {
    validateUsername: jest.fn((name) => [false, "Username must be between 5 and 15 characters!"])
    validateEmail: jest.fn((email) => [false, "Invalid email!"])
    validatePassword: jest.fn((pass) => [false, "Password must be within 8 and 20 characters"])

    await signupController(fakeReq, fakeRes)

    expect(fakeRes.status).toBeCalledWith(500)
})