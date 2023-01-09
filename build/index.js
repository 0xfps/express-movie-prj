"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const signup_1 = __importDefault(require("./routes/signup"));
require("./db/index");
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use(express_1.default.text());
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.listen(PORT, () => console.log(`Server live on port ${PORT}!`));
app.use("/v1/auth", signup_1.default);
