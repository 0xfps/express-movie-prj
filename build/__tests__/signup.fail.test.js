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
const signup_1 = __importDefault(require("../controllers/signup"));
require("../utils/hash");
jest.mock("../db/schema/users");
jest.mock("../utils/hash", () => ({
    hashPassword: jest.fn((pass) => "let's call this a hash"),
    getRandom: jest.fn(() => "randomxy")
}));
const fakeReq = {
    body: {
        username: "User",
        email: "email",
        password: "pass"
    }
};
const fakeRes = {
    status: jest.fn((x) => x),
    send: jest.fn(() => ({
        success: "false",
        msg: []
    }))
};
it("should fail with a 500", () => __awaiter(void 0, void 0, void 0, function* () {
    validateUsername: jest.fn((name) => [false, "Username must be between 5 and 15 characters!"]);
    validateEmail: jest.fn((email) => [false, "Invalid email!"]);
    validatePassword: jest.fn((pass) => [false, "Password must be within 8 and 20 characters"]);
    yield (0, signup_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toBeCalledWith(500);
}));
