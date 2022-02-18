"use strict";
//import and start express app
const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

//set port number and import mongoDB related modules
const port = 3001;
const mongoose = require("mongoose");

//import all the routes needed
const user = require("./routes/user");
const login = require("./routes/login.js");
const files = require("./routes/files.js");
//configure .env file
const dotenv = require("dotenv");
dotenv.config();
const path = require("path")


//connection to database
mongoose.connect(process.env.dbconn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("connected to fire-eye database")).catch((err) => console.log(err));

//express middleware for parsing json requests
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(bodyParser.json());
app.use(express.json({ extended: true }));
app.use(cookieParser());

//setup route for login
app.use("/auth", login);

//setup route for user profile
app.use("/user", user);

app.use("/nas", files);

//route for testing
app.get("/brian", (req, res) => {
  console.log(req);
  res.send("Hello");
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

//set the server to listen on the port choosen
app.listen(port, (err) => {
  if (err) {
    console.log(`error: ${error}`);
  }
  console.log(`server is listening on port ${port}`);
});
