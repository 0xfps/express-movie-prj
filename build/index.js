"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("./routes/post"));
const buy_1 = __importDefault(require("./routes/buy"));
require("./routes/info");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use("/api/buy", buy_1.default);
app.use("/api/post", post_1.default);
app.listen(PORT, () => console.log(`Movie server running!`));
