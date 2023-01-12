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
const movies_1 = __importDefault(require("../db/schema/movies"));
const empty_1 = require("../utils/empty");
const hash_1 = require("../utils/hash");
const post_1 = __importDefault(require("../controllers/post"));
jest.mock("../db/schema/movies");
jest.mock("../utils/empty");
jest.mock("../utils/hash");
// Test 1.
it("should receive 300 because it is called with empty body params", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "random");
    // @ts-ignore
    empty_1.empty.mockImplementationOnce(() => true);
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
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: false,
            msg: "msg"
        }))
    };
    yield (0, post_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
}));
// Test 2.
it("should receive a 300 because the price or qty is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "random");
    // @ts-ignore
    empty_1.empty.mockImplementationOnce(() => false);
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
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: false,
            msg: "msg"
        }))
    };
    yield (0, post_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
}));
// Test 3.
it("should receive a 201 because a movie was created", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "random");
    // @ts-ignore
    empty_1.empty.mockImplementationOnce(() => false);
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
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: true,
            msg: "msg"
        }))
    };
    // @ts-ignore
    movies_1.default.create.mockImplementationOnce(() => ({
        movieId: hash_1.getRandom
    }));
    yield (0, post_1.default)(req, res);
    expect(res.status).toBeCalledWith(201);
}));
// Test 3.
it("should receive a 500 because a movie was not created", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "random");
    // @ts-ignore
    empty_1.empty.mockImplementationOnce(() => false);
    // @ts-ignore
    empty_1.emptyObject.mockImplementationOnce(() => true);
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
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(() => ({
            success: true,
            msg: "msg"
        }))
    };
    // @ts-ignore
    movies_1.default.create.mockImplementationOnce(() => ({}));
    yield (0, post_1.default)(req, res);
    expect(res.status).toBeCalledWith(500);
}));
