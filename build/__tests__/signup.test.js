"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const signup_1 = __importStar(require("../controllers/signup"));
const users_1 = __importDefault(require("../db/schema/users"));
require("../utils/hash");
const hash_1 = require("../utils/hash");
jest.mock("../db/schema/users");
jest.mock("../utils/hash", () => ({
    hashPassword: jest.fn((pass) => "let's call this a hash"),
    getRandom: jest.fn(() => "randomxy")
}));
const fakeReq = {
    body: {
        username: "user",
        email: "email",
        password: "pass"
    },
    session: {
        userId: "none"
    }
};
const fakeReq2 = {
    body: {
        username: "username",
        email: "email@mail.com",
        password: "password"
    },
    session: {
        userId: "none"
    }
};
const fakeRes = {
    status: jest.fn((x) => x),
    send: jest.fn(() => ({
        success: "false",
        msg: []
    })),
    cookie: jest.fn((x, y, z) => ({
        x: y
    }))
};
it("should fail with a 500 because username is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, signup_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toBeCalledWith(500);
}));
it("should fail with a 500 because email is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, signup_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toBeCalledWith(500);
}));
it("should fail with a 500 because password is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, signup_1.default)(fakeReq, fakeRes);
    expect(fakeRes.status).toBeCalledWith(500);
}));
it("should fail with a 300 because user wasn't created", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    users_1.default.create.mockImplementationOnce(() => null);
    yield (0, signup_1.default)(fakeReq2, fakeRes);
    expect(fakeRes.status).toBeCalledWith(300);
}));
it("should signup with a 200 because all is well", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    users_1.default.create.mockImplementationOnce(() => ({
        userId: hash_1.getRandom,
        username: signup_1.validateUsername,
        email: signup_1.validateEmail,
        password: signup_1.validatePassword
    }));
    yield (0, signup_1.default)(fakeReq2, fakeRes);
    expect(fakeRes.status).toBeCalledWith(201);
}));
