const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  fetchCustomers,
  addCustomer,
  fetchCustomer,
  deleteCustomer,
  updateCustomer,
} = require("./controllers");

router.get("/", fetchCustomers);
router.get("/:customerId", fetchCustomer);
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  addCustomer
);

router.put(
  "/:customerId",
  passport.authenticate("jwt", { session: false }),
  updateCustomer
);

router.delete(
  "/:customerId",
  passport.authenticate("jwt", { session: false }),
  deleteCustomer
);

module.exports = router;
