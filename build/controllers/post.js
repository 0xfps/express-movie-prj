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
// @ts-ignore
const postController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, desc, price, quantity } = req.body;
    const seller = req.session.userId;
    const movieId = (0, hash_1.getRandom)();
    const emptyName = (0, empty_1.empty)(name);
    const emptyPrice = (0, empty_1.empty)(price);
    const emptyDesc = (0, empty_1.empty)(desc);
    const emptyQty = (0, empty_1.empty)(quantity);
    if (emptyName ||
        emptyPrice ||
        emptyPrice ||
        emptyQty ||
        ((typeof price) != "number") ||
        ((typeof quantity) != "number")) {
        res.status(300);
        res.send({
            success: false,
            msg: "Invalid data passed"
        });
        return;
    }
    const newMovie = yield movies_1.default.create({ movieId, name, desc, price, quantity });
    if ((0, empty_1.emptyObject)(newMovie)) {
        res.status(500);
        res.send({
            success: false,
            msg: "Error creating a new movie"
        });
    }
    else {
        res.status(201);
        res.send({
            success: true,
            msg: newMovie
        });
    }
});
exports.default = postController;
