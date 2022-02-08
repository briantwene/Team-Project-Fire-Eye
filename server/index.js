"use strict";
//import and start express app
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//set port number and import mongoDB related modules
const port = 3001;
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

//import all the routes needed
const passport = require("./services/setupPassport");
const auth = require("./routes/login");
const images = require("./routes/images");
const user = require("./routes/user");
const login = require("./routes/login.js");

//configure .env file
const dotenv = require("dotenv");
dotenv.config();

//connection to database
mongoose
  .connect(process.env.dbconn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to fire-eye database"))
  .catch((err) => console.log(err));

//express middleware for parsing json requests
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.urlencoded({ extended: false }));

//using the session middleware to create a session id for the user
app.use(
  session({
    secret: "very secret this",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 },
    //store: MongoStore.create({ mongoUrl: process.env.dbconn }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//setup route for login
app.use("/auth", login);

//setup route for user profile
app.use("/user", user);

//setup routes for the cctv footage
app.use("/footage", images);

//route for testing
app.get("/", (req, res) => {
  res.send("HELLO");
});

//set the server to listen on the port choosen
app.listen(port, (err) => {
  if (err) {
    console.log(`error: ${error}`);
  }
  console.log(`server is listening on port ${port}`);
});
