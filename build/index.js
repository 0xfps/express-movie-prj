"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const signup_1 = __importDefault(require("./routes/signup"));
require("./db/index");
const login_1 = __importDefault(require("./routes/login"));
const view_1 = __importDefault(require("./routes/view"));
const post_1 = __importDefault(require("./routes/post"));
const buy_1 = __importDefault(require("./routes/buy"));
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
app.use((0, cookie_parser_1.default)());
app.listen(PORT, () => console.log(`Server live on port ${PORT}!`));
app.get("/", (req, res) => {
    res.send({
        status: 200,
        msg: "Connected and live!"
    });
});
app.use("/v1/auth", signup_1.default);
app.use("/v1/auth", login_1.default);
app.use("/v1/movies", view_1.default);
app.use((req, res, next) => {
    if (req.cookies.userId) {
        req.session.userId = req.cookies.userId;
        res.cookie("userId", req.cookies.userId, {
            maxAge: 60 * 60 * 24 * 1000 // One day.
        });
        next();
    }
    else if (req.session.userId) {
        res.cookie("userId", req.session.userId, {
            maxAge: 60 * 60 * 24 * 1000 // One day.
        });
        next();
    }
    else {
        res.status(404);
        res.send({
            success: false,
            msg: "Session expired"
        });
        next();
    }
});
app.use("/v1/new", post_1.default);
app.use("/v1/buy", buy_1.default);
exports.default = app;
