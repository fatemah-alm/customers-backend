const express = require("express");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
require("dotenv").config();

//import routes
const customerRoutes = require("./api/customers/routes");
const userRoutes = require("./api/user/routes");

//init
const connectDb = require("./database");
const app = express();
const port = 8000;
app.use(express.json());

//middlewares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//routes
app.use("/api/customers", customerRoutes);
app.use("/api/auth/", userRoutes);

// request print on every request - middlewares
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
});

//Error handling middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message } || "Internal server error");
});

//path not found
app.use((req, res, next) => {
  res.status(404).json("Path not found");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

connectDb();
