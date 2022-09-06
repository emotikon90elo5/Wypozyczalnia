const express = require("express");
const router = new express.Router();
const formidable = require("formidable");
const Car = require("./../models/car");

router.get("/panel", (req, res) => {
    if (req.session.passport == undefined)
        return res.render("login", { user: req.session.passport });
    res.render("panel", { user: req.session.passport });
});

router.get("/panel/addCar", (req, res) => {
    if (req.session.passport == undefined)
        return res.render("login", { user: req.session.passport });
    res.render("addCar", { user: req.session.passport });
});

router.post("/panel/addCar", (req, res) => {
    console.log("hmm");
    const options = {
        uploadDir: `./public/img/u/`,
        keepExtensions: true,
        multiples: true,
    };

    let form = new formidable.IncomingForm(options);
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not upload",
            });
        }
        let list = [];
        files.somefile.forEach((element) => {
            list[list.length] = element.newFilename;
        });

        const car = new Car({
            info: {
                main: {
                    name: fields.name,
                    engine: fields.engine,
                    slots: fields.slots,
                    gearBox: fields.gearBox,
                    production: fields.production,
                    fuel: fields.fuel,
                },
                subPage: {
                    power: fields.power,
                    combustion: fields.combustion,
                    bodyType: fields.bodyType,
                    extraInfo: fields.extraInfo,
                },
            },
            dataForApi: {
                registrationNumber: fields.registrationNumber,
                mileage: fields.mileage,
                carReview: {
                    mileage: fields.carReviewMileage,
                    date: fields.carReviewDate,
                },
                carInsurance: {
                    date: fields.carInsurance,
                },
            },
            imgs: list,
        });
        car.save().then();

        res.json({ status: true });
    });
    console.log("work");
});

module.exports = router;
