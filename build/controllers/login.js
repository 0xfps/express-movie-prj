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
const users_1 = __importDefault(require("../db/schema/users"));
const empty_1 = require("../utils/empty");
const hash_1 = require("../utils/hash");
// @ts-ignore
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if ((0, empty_1.empty)(username) || (0, empty_1.empty)(password)) {
        res.status(300);
        res.send({
            success: false,
            msg: "Invalid credentials"
        });
    }
    const findUser = yield users_1.default.findOne({ username: username });
    if (findUser != null) {
        const usersHash = findUser.password;
        if ((0, hash_1.verifyPassword)(password.toString(), usersHash)) {
            req.session.userId = findUser.userId;
            res.cookie("userId", findUser.userId, {
                maxAge: 60 * 60 * 24 * 1000 // One day.
            });
            res.status(200);
            res.send({
                success: true,
                msg: "Logged In!"
            });
        }
        else {
            res.status(500);
            res.send({
                success: false,
                msg: "Invalid password!"
            });
        }
    }
    else {
        res.status(400);
        res.send({
            success: false,
            msg: "Inexistent username!"
        });
    }
});
exports.default = loginController;
