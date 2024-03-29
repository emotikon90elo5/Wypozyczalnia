let mongoose = require("mongoose");
let carSchema = new mongoose.Schema({
    info: {
        main: {
            name: String,
            engine: String,
            slots: Number,
            gearBox: String,
            production: Number,
            fuel: String,
        },
        subPage: {
            power: Number,
            combustion: mongoose.Types.Decimal128,
            bodyType: String,
            extraInfo: String,
            price:{
                f7:Number,
                f14:Number,
                f30:Number,
                f31:Number
            }
        },
    },
    dataForApi: {
        registrationNumber: String,
        mileage: Number,
        carReview: {
            mileage: Number,
            date: Date,
        },
        carInsurance: {
            date: Date,
        },
    },
    imgs: [],
});

let car = mongoose.model("Car", carSchema);
module.exports = car;
