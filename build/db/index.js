"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
// const URL: string = "mongodb://127.0.0.1:27017/theatre"
// @ts-ignore
const URI = process.env.MONGO_URI;
mongoose_1.default
    .connect(URI)
    .then(() => console.log("Connected!"))
    .catch((err) => {
    throw err;
});
