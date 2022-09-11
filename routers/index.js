const express = require("express");
const car = require("./../models/car");
const router = new express.Router();

router.get("/", (req, res) => {
    res.render("index", { user: req.session.passport });
});
let cars = [];
router.get("/rent", async (req, res) => {
    if (cars.length == 0) {
        try {
            await car
                .find({}, async (err, car) => {
                    cars = car;
                })
                .clone();
        } catch (err) {
            console.log(err);
        }
    }

    await res.render("rent", { user: req.session.passport, cars: cars });
});

const reset = () => {
    cars = [];
};

module.exports = { router: router, reset: reset };
