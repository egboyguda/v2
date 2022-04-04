const express = require("express"),
  app = express(),
  authRoute = require("./routes/authRoute"),
  postRoute = require("./routes/evacuationRoute"),
  auth = require("./middleware/auth.js")(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  localStrategy = require("passport-local"),
  User = require("./models/user"),
  bodyParser = require("body-parser");

const evacueesRoute = require("./routes/evacueesRoute");
const multer = require("multer");
const path = require("path");
const upload = multer();
require("dotenv").config();
//'mongodb://localhost/evacuation'
//'mongodb+srv://gboy:mJWNrMKXowbXzIGX@cluster0.tc0eh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect(
  "mongodb+srv://gboy:mJWNrMKXowbXzIGX@cluster0.tc0eh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("DATABASE IS CONNECTED");
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(upload.array());
app.use(auth.initialize());
// Passport Config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
//app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//dd mga routes
app.use(authRoute);
app.use(postRoute);
app.use("/evac", evacueesRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started at 3000");
});
