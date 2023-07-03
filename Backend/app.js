const session = require('express-session');
const express = require("express");
const { json } = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")

require('dotenv').config({ path: __dirname + '/.env' })

const connectDB = require("./database/connection")
const userRoutes = require("./routes/userRoute");
const InterviewRoute = require("./routes/interviewRoute");
const questRoute = require("./routes/questionRoute");
const dfRoute = require("./routes/dialogRoute");

connectDB();
var app = express();
//to be able to recognize ports between back & front
app.use(
    cors({
        credentials: true,
        origin: ["http://localhost:4200"],
    })
);
// exchanging cookies
app.use(cookieParser());
app.use(json());

//Routes
app.use("/api/user", userRoutes);
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Set your session secret key from the .env file
        resave: false,
        saveUninitialized: false
    })
);
app.use("/api", dfRoute);
app.use("/api/admission",InterviewRoute)
app.use("/api/q", questRoute)
app.listen(8000);

module.exports = app;