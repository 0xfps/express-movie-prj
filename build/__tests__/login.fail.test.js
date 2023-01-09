"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = __importDefault(require("../controllers/login"));
const users_1 = __importDefault(require("../db/schema/users"));
jest.mock("../db/schema/users");
jest.mock("../utils/empty");
jest.mock("../utils/hash", () => ({
    hashPassword: jest.fn((x) => "hashhahha"),
    verifyPassword: jest.fn((x, y) => x == y),
    getRandom: jest.fn(() => "a9ieqipj")
}));
const fakeReq = {
    body: {
        username: "antonio",
        password: "fakepass"
    },
    session: {
        userId: "none"
    }
};
const emptyReq = {
    body: {
        username: "",
        password: ""
    },
    session: {
        userId: "none"
    }
};
const fakeRes = {
    status: jest.fn((x) => x),
    send: jest.fn(() => ({
        success: "false",
        msg: "Invalid password!"
    })),
    cookie: jest.fn((x, y, z) => ({
        x: y
    }))
};
it("should call 500 for status because password is wrong", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    users_1.default.findOne.mockImplementationOnce(() => ({
        userId: "uiansjea",
        username: "antonio",
        email: "fakeemail",
        password: "aljdaijfoiqejapfjapmdfadofa/podfapfiapjoajpdiojap"
    }));
    yield (0, login_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toHaveBeenCalledWith(500);
}));
it("should fail with inexistent username 400", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    users_1.default.findOne.mockImplementationOnce(() => null);
    yield (0, login_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toHaveBeenCalledWith(400);
}));
// jest.mock("../utils/hash", () => ({
//     hashPassword: jest.fn((x) => "hashhahha"),
//     verifyPassword: jest.fn((x, y) => true),
//     getRandom: jest.fn(() => "a9ieqipj")
// }))
it("should log the user in", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    users_1.default.findOne.mockImplementationOnce(() => ({
        userId: "uiansjea",
        username: "antonio",
        email: "fakeemail",
        password: "fakepass"
    }));
    yield (0, login_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toHaveBeenCalledWith(200);
}));
