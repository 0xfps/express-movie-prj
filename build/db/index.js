"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URL = "mongodb://127.0.0.1:27017/theatre";
mongoose_1.default
    .connect(URL)
    .then(() => console.log("Connected!"))
    .catch((err) => {
    throw err;
});
