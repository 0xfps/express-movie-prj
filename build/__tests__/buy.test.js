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
const buy_1 = __importDefault(require("../controllers/buy"));
const movies_1 = __importDefault(require("../db/schema/movies"));
const empty_1 = require("../utils/empty");
const hash_1 = require("../utils/hash");
jest.mock("../db/schema/movies");
jest.mock("../db/schema/purchases");
jest.mock("../utils/empty");
jest.mock("../utils/hash");
it("should fail with 300 because one of the req.body is empty", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 80
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => true);
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Invalid data passed"
    });
}));
it("should fail with 300 because the numbers are not numbers", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: "ask",
            amount: "amt"
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => true);
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Invalid data passed"
    });
}));
it("should fail with 404 because requested movie is not found", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 80
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => false);
    // @ts-ignore
    movies_1.default.findOne.mockImplementationOnce(() => null);
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Movie inexistent"
    });
}));
it("should fail with 300 because user is buying more than is left", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 80
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => false);
    // @ts-ignore
    movies_1.default.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 4
    }));
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "You're buying more than is left"
    });
}));
it("should fail with 300 because amount is less than price", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 50
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => false);
    // @ts-ignore
    movies_1.default.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 15
    }));
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: `Payment not up to price. Trying to pay ${req.body.amount} for movies costing ${8 * req.body.number}`
    });
}));
it("should fail with 500 because there was an error buying the movie", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 100
        },
        session: {
            userId: "userId"
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => false);
    // @ts-ignore
    movies_1.default.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 15
    }));
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "randomxy");
    // @ts-ignore
    movies_1.default.create.mockImplementationOnce(() => ({}));
    /// @ts-ignore
    empty_1.emptyObject.mockImplementationOnce(() => true);
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Error buying movie"
    });
}));
it("should fail with 500 because records weren't updated", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 100
        },
        session: {
            userId: "userId"
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => false);
    // @ts-ignore
    movies_1.default.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        price: 8,
        quantity: 15
    }));
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "randomxy");
    // @ts-ignore
    movies_1.default.create.mockImplementationOnce(() => ({
        movieId: "movieId"
    }));
    // @ts-ignore
    movies_1.default.updateOne.mockImplementationOnce(() => ({
        movieId: "movieId"
    }));
    /// @ts-ignore
    empty_1.emptyObject
        // @ts-ignore
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(500);
    expect(res.send).toBeCalledWith({
        success: false,
        msg: "Error updating records"
    });
}));
it("should pass with 200 because all went well", () => __awaiter(void 0, void 0, void 0, function* () {
    const req = {
        body: {
            movieId: "movieId",
            number: 8,
            amount: 100
        },
        session: {
            userId: "userId"
        }
    };
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn((o) => o)
    };
    // @ts-ignore
    empty_1.empty.mockImplementationOnce((val) => false);
    // @ts-ignore
    movies_1.default.findOne.mockImplementationOnce(() => ({
        movieId: "movieId",
        name: "Avatar",
        price: 8,
        quantity: 15
    }));
    // @ts-ignore
    hash_1.getRandom.mockImplementationOnce(() => "randomxy");
    // @ts-ignore
    movies_1.default.create.mockImplementationOnce(() => ({
        movieId: "movieId"
    }));
    // @ts-ignore
    movies_1.default.updateOne.mockImplementationOnce(() => ({
        movieId: "movieId"
    }));
    /// @ts-ignore
    empty_1.emptyObject
        // @ts-ignore
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false);
    yield (0, buy_1.default)(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({
        success: true,
        msg: `${req.body.number} copies of ${req.body.movieId} : Avatar purchased successfully @ ${req.body.amount}.`
    });
}));
