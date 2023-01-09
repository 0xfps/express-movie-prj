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
const express_1 = require("express");
const movies_1 = __importDefault(require("../db/schema/movies"));
const purchases_1 = __importDefault(require("../db/schema/purchases"));
const empty_1 = require("../utils/empty");
const hash_1 = require("../utils/hash");
const buyRoute = (0, express_1.Router)();
// QUERY
buyRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId, number, amount } = req.body;
    // number: How many you're buying.
    // amount: How much you're paying.
    const emptyMovieID = (0, empty_1.empty)(movieId);
    const emptyNumber = (0, empty_1.empty)(number);
    const emptyAmount = (0, empty_1.empty)(amount);
    if (emptyMovieID ||
        emptyNumber ||
        emptyAmount ||
        ((typeof number) != "number") ||
        ((typeof amount) != "number")) {
        res.status(300);
        res.send({
            success: false,
            msg: "Invalid data passed"
        });
        return;
    }
    // This is where the math maths.
    // Take it gently.
    // First, check if the movie to be bought exists.
    const requestedMovie = yield movies_1.default.findOne({ movieId: movieId });
    if (!requestedMovie) {
        res.status(404);
        res.send({
            success: false,
            msg: "Movie inexistent"
        });
        return;
    }
    // If movie exists, we extract the price and the number remaining (quantity).
    const priceOne = requestedMovie.price;
    const quantityLeft = requestedMovie.quantity;
    // If the number the user wants to buy is > the quantity left, break.
    if (number > quantityLeft) {
        res.status(300);
        res.send({
            success: false,
            msg: "You're buying more than is left"
        });
        return;
    }
    // If the amount sent is not up to the price to be paid.
    if (amount < (priceOne * number)) {
        res.status(300);
        res.send({
            success: false,
            msg: `Payment not up to price. Trying to pay ${amount} for movies costing ${priceOne * number}`
        });
        return;
    }
    // If all passes.
    // Reduce the quantity left by the number bought.
    const newQuantity = quantityLeft - number;
    const pId = (0, hash_1.getRandom)();
    const [purchaseId, buyerId, quantity, price] = [pId, req.session.userId, number, priceOne * number];
    // Record purchase.
    const newPurchae = yield purchases_1.default.create({ purchaseId, buyerId, movieId, quantity, price });
    if ((0, empty_1.emptyObject)(newPurchae)) {
        res.status(500);
        res.send({
            success: false,
            msg: "Error buying movie"
        });
        return;
    }
    // Update movie record.
    const updateMovie = yield movies_1.default.updateOne({ movieId: movieId }, { $set: { quantity: newQuantity } });
    if ((0, empty_1.emptyObject)(updateMovie)) {
        res.status(500);
        res.send({
            success: false,
            msg: "Error updateing records"
        });
        return;
    }
    res.status(200);
    res.send({
        success: true,
        msg: `${number} copies of ${movieId} : ${requestedMovie.name} purchased successfully @ ${amount}.`
    });
}));
exports.default = buyRoute;
