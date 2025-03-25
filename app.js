import express from "express";
import morgan from "morgan";
import cors from "cors";
import runDbMigrations from "./db/migrations/index.js";

//import routes
import customerRoutes from "./api/customers/routes.js";
import authRoutes from "./api/user/routes.js";
import helmet from "helmet";

//init
const app = express();
const port = 8000;
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.use(express.json());
await runDbMigrations();

// routes

app.use("/customers", customerRoutes);
app.use("/api/auth", authRoutes);

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

export default app;
