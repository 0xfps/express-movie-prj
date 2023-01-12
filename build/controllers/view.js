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
const movies_1 = __importDefault(require("../db/schema/movies"));
const empty_1 = require("../utils/empty");
// @ts-ignore
const viewController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getAll = yield movies_1.default.find({});
    if ((0, empty_1.emptyArray)(getAll)) {
        res.status(300);
        res.send({
            success: true,
            msg: "There are no movies at the moment"
        });
        return;
    }
    res.status(200);
    res.send({
        success: true,
        msg: getAll
    });
});
exports.default = viewController;
