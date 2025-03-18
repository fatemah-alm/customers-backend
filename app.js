const express = require("express");
const customerRoutes = require("./api/customers/routes");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const connectDb = require("./database");

const app = express();
const port = 8000;

//middlewares
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
routes;
app.use("/api/customers", customerRoutes);

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
