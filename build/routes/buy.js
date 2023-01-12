"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buy_1 = __importDefault(require("../controllers/buy"));
const buyRoute = (0, express_1.Router)();
// QUERY
buyRoute.post("/", buy_1.default);
exports.default = buyRoute;
