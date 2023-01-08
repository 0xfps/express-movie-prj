"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.verifyPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = (pass) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    const hash = bcryptjs_1.default.hashSync(pass, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const verifyPassword = (pass, hash) => {
    const isMatch = bcryptjs_1.default.compareSync(pass, hash);
    return isMatch;
};
exports.verifyPassword = verifyPassword;
const getRandom = () => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.getRandom = getRandom;
