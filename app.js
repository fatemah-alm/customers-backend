const express = require("express");
const customerRoutes = require("./api/customers/routes");

const app = express();
const port = 8000;

//routes
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
