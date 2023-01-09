"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const movies = new mongoose_1.default.Schema({
    movieId: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
        unique: true
    },
    name: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true
    },
    desc: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true
    },
    price: {
        type: mongoose_1.default.SchemaTypes.Number,
        required: true,
        default: 0
    },
    quantity: {
        type: mongoose_1.default.SchemaTypes.Number,
        required: true
    }
});
exports.default = mongoose_1.default.model("movies", movies);
