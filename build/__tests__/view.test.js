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
const view_1 = __importDefault(require("../controllers/view"));
const movies_1 = __importDefault(require("../db/schema/movies"));
const empty_1 = require("../utils/empty");
jest.mock("../db/schema/movies");
jest.mock("../utils/empty");
it("should return 300 due to empty list", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    empty_1.emptyArray.mockImplementationOnce((x) => true);
    const req = {};
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(({ success: x, msg: y }) => ({
            success: x,
            msg: y
        }))
    };
    // @ts-ignore
    movies_1.default.find.mockImplementationOnce(() => []);
    yield (0, view_1.default)(req, res);
    expect(res.status).toBeCalledWith(300);
    expect(empty_1.emptyArray).toBeCalledTimes(1);
    expect(movies_1.default.find).toBeCalledTimes(1);
}));
it("should return a view", () => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    empty_1.emptyArray.mockImplementationOnce((x) => false);
    const req = {};
    const res = {
        status: jest.fn((x) => x),
        send: jest.fn(({ success: x, msg: y }) => ({
            success: x,
            msg: y
        }))
    };
    // @ts-ignore
    movies_1.default.find.mockImplementationOnce(() => [
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
        { a: "", b: "" },
    ]);
    yield (0, view_1.default)(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(empty_1.emptyArray).toBeCalledTimes(1);
    expect(movies_1.default.find).toBeCalledTimes(1);
}));
