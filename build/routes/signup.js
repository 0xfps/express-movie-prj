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
const users_1 = __importDefault(require("../db/schema/users"));
const hash_1 = require("../utils/hash");
const signupRoute = (0, express_1.Router)();
const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_.";
/**
 * A few rules to note:
 * Username must:
 * - Be within 5 and 15 characters.
 * - Not have spaces.
 * - Not be in the DB.
 * @param name
 */
const validateUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    let isValid = true;
    let validUsername = undefined;
    const passedUsername = username.trim();
    const usernameLength = passedUsername.length;
    // Validate username length.
    if (usernameLength < 5 || usernameLength > 15) {
        isValid = false;
        validUsername = "Username must be between 5 and 15 characters!";
    }
    // Check the username contents.
    if (isValid) {
        for (let i = 0; i < passedUsername.length; i++) {
            // If username character is not included in the allowed characters
            // Break and return
            if (!allowedChars.includes(username[i])) {
                isValid = false;
                validUsername = "Invalid character in username!";
                break;
            }
        }
    }
    // Check uniqueness in db.
    if (isValid) {
        const oneUsername = yield users_1.default.findOne({ username: passedUsername });
        if (oneUsername != null) {
            isValid = false;
            validUsername = "Username exists.";
        }
        else {
            // All has passed and the user is unique.
            validUsername = passedUsername;
        }
    }
    return [isValid, validUsername];
});
const validateEmail = (email) => {
    let emailIsOK = true;
    let msg = "";
    const validMail = email.trim();
    if (!validMail.includes("@") || !validMail.includes(".com", validMail.length - 4)) {
        emailIsOK = false;
        msg = "Invalid email!";
    }
    else {
        msg = validMail;
    }
    return [emailIsOK, msg];
};
const validatePassword = (password) => {
    let passwordOK = true;
    let msg = "";
    if (password.toString().length < 8 || password.toString().length > 20) {
        passwordOK = false;
        msg = "Password must be within 8 and 20 characters";
    }
    return [passwordOK, msg];
};
signupRoute.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const [isValidUsername, returnedUsername] = yield validateUsername(username);
    const [isValidEmail, returnedMail] = validateEmail(email);
    const [isValidPass, returnedPass] = validatePassword(password);
    if (isValidUsername && isValidEmail && isValidPass) {
        const hashedPassword = (0, hash_1.hashPassword)(returnedPass);
        const userId = (0, hash_1.getRandom)();
        const [username, email, password] = [returnedUsername, returnedMail, hashedPassword];
        const newUser = yield users_1.default.create({ userId, username, email, password });
        if (newUser != null) {
            req.session.userId = userId;
            res.cookie("userId", userId, {
                maxAge: 60 * 60 * 24
            });
            res.status(201);
            res.send({
                success: true,
                msg: "Account created!"
            });
        }
        else {
            res.status(500);
            res.send({
                success: false,
                msg: "Server Error!"
            });
        }
    }
    else {
        res.status(500);
        res.send({
            success: false,
            msg: [
                returnedUsername,
                returnedMail,
                returnedPass
            ]
        });
    }
}));
exports.default = signupRoute;
