// const express = require("express");
import express from "express";
import runDbMigrations from "./db/migrations/index.js";
const app = express();
import bodyParser from "body-parser";
// const passport = require("passport");
// const bodyParser = require("body-parser");
// const { localStrategy, jwtStrategy } = require("./middleware/passport");
// require("dotenv").config();

//import routes
import customerRoutes from "./api/customers/routes.js";
// const customerRoutes = require("./api/customers/routes");
// const userRoutes = require("./api/user/routes");
// const { default: runDbMigrations } = require("./db/migrations");

//init
// const connectDb = require("./database");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
await runDbMigrations();
const port = 8000;

app.use(express.json());
app.use("/customers", customerRoutes);
//middlewares
// app.use(passport.initialize());
// passport.use(localStrategy);
// passport.use(jwtStrategy);

//routes
// app.use("/api/customers", customerRoutes);
// app.use("/api/auth/", userRoutes);

// request print on every request - middlewares
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
});

//Error handling middleware
// app.use((err, req, res, next) => {
//   res
//     .status(err.status || 500)
//     .json({ message: err.message } || "Internal server error");
// });

//path not found
// app.use((req, res, next) => {
//   res.status(404).json("Path not found");
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

export default app;
