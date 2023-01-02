"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const info_1 = require("./info");
const postRouter = (0, express_1.Router)();
postRouter.use((req, res, next) => {
    info_1.IPs.push(req.ip);
    next();
});
postRouter.post("/", (req, res) => {
    const { name, title, desc, duration, price, available } = req.body;
    const movieId = info_1.idCounter + 1;
    const newFilm = {
        id: movieId,
        name: name,
        title: title,
        desc: desc,
        duration: duration,
        price: price,
        available: available
    };
    info_1.films.push(newFilm);
    (0, info_1.incrementTotalFilms)();
    (0, info_1.incrementIdCounter)();
    res.status(201).send(`${name} uploaded, priced at ${price} each for ${available} pieces`);
});
exports.default = postRouter;
