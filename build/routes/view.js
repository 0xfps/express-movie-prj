"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const view_1 = __importDefault(require("../controllers/view"));
const viewRoute = (0, express_1.Router)();
// Returns a list of all movies in store.
viewRoute.get("/", view_1.default);
exports.default = viewRoute;
