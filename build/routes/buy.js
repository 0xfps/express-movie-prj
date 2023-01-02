"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const info_1 = require("./info");
const buyRouter = (0, express_1.Router)();
buyRouter.use((req, res, next) => {
    info_1.IPs.push(req.ip);
    next();
});
buyRouter.get("/", (req, res) => {
    res.status(200).send({
        totalFilms: info_1.totalFilms,
        films: info_1.films
    });
});
buyRouter.get("/:id/:num/:amount", (req, res) => {
    const { id, num, amount } = req.params;
    const _id = Number(id);
    const _num = Number(num);
    const _amount = Number(amount);
    if (!isNaN(_id) && !isNaN(_num) && !isNaN(_amount)) {
        if (info_1.films.length > 0) {
            const oneFilm = info_1.films.find((v, i, a) => v.id == _id);
            console.log(oneFilm);
            if (oneFilm == undefined) {
                res.status(404).send("Film not found.");
            }
            else {
                if ((oneFilm.price * _num) < _amount) {
                    res.status(403).send("Price low.");
                }
                else {
                    console.log("Bought");
                    (0, info_1.decrementTotalFilms)(_num);
                    (0, info_1.incrementTotalCash)((oneFilm.price * _num));
                }
            }
        }
        else {
            res.status(503).send("No films at the moment.");
        }
    }
    else {
        res.status(503).send("Invalid param.");
    }
});
buyRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const _id = Number(id);
    if (!isNaN(_id)) {
        if (info_1.films.length > 0) {
            const oneFilm = info_1.films.find((v, i, a) => v.id == _id);
            console.log(oneFilm);
            if (oneFilm == undefined) {
                res.status(404).send("Film not found.");
            }
            else {
                console.log(oneFilm);
                res.status(200).send(oneFilm);
            }
        }
        else {
            res.status(503).send("No films at the moment.");
        }
    }
    else {
        res.status(503).send("Invalid param.");
    }
});
exports.default = buyRouter;
