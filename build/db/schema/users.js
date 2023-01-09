"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
        unique: true
    },
    username: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
    },
    password: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
    }
});
exports.default = mongoose_1.default.model("users", users);
