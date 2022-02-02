const express = require("express");
const session = require("express-session");
const app = express();

const port = 3001;
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const passport = require("./services/setupPassport");
const auth = require("./routes/login");
const login = require("./routes/auth/login.js");
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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "very secret this",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//setup route for login
app.use("/auth", login);

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(port, (err) => {
  if (err) {
    console.log(`error: ${error}`);
  }
  console.log(`server is listening on port ${port}`);
});
