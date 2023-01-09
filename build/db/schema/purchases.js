"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const purchases = new mongoose_1.default.Schema({
    purchaseId: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true,
        unique: true
    },
    buyerId: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true
    },
    movieId: {
        type: mongoose_1.default.SchemaTypes.String,
        required: true
    },
    quantity: {
        type: mongoose_1.default.SchemaTypes.Number,
        required: true
    },
    price: {
        type: mongoose_1.default.SchemaTypes.Number,
        required: true
    }
});
exports.default = mongoose_1.default.model("purchases", purchases);
