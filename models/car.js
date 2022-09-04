let mongoose = require('mongoose');

let carSchema = new mongoose.Schema({
 name: String,
 engine: String,
 power: Number,
 combustion: Number,
 gearBox: String,
 production: Number,
 slots: Number,
 fuel: String,
 bodyType: String,
 extraInfo: String, 
 registrationNumber: String,
 mileage: Number,
 carReview:{
    mileage: Number,
    date: Date,
 },
 carInsurance:{
    date: Date,
 }
});

let car = mongoose.model('Car', carSchema);
module.exports = car;