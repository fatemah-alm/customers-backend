const express = require("express");
// const passport = require("passport");
const router = express.Router();

const { fetchCustomers } = require("./controllers");

router.get("/", fetchCustomers);

module.exports = router;
