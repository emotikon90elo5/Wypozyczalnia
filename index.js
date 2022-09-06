const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
//

const app = new express();

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(
    "mongodb+srv://emotikonowy:2a73ikFECsyRN25g@cluster0.ze9ndtf.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true }
);

app.use(
    session({
        name: "session-id",
        secret: "2a73ikFECsyRN25ed",
        saveUninitialized: false,
        resave: false,
    })
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(passport.initialize());
app.use(passport.session({ pauseStream: true }));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("./routers/index"));
app.use(require("./routers/panel"));
app.use(require("./routers/login"));

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
