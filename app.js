const express = require("express");
const customerRoutes = require("./api/customers/routes");

const app = express();
const port = 8000;

//routes
app.use("/api/customers", customerRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
