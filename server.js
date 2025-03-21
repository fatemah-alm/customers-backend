import "dotenv/config";
const express = require("express");

const app = express();
import runDbMigrations from "./db/migrations/index.js";

async function start() {
  await runDbMigrations();

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`running on port ${port}`);
  });
}

start();
