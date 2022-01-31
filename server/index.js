const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const login = require("./routes/auth/login.js")
const dotenv = require("dotenv")
dotenv.config()

//connection to database
mongoose.connect(process.env.dbconn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to fire-eye database"))
  .catch((err) => console.log(err));


//setup route for login
app.use("/auth", login)

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(port, (err) => {
  if (err) {
    console.log(`error: ${error}`);
  }
  console.log(`server is listening on port ${port}`);
});
