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

router.param("customerId", async (req, res, next, customerId) => {
  const customer = await fetchCustomer(customerId, next);
  if (customer) {
    res.customer = customer;
    next();
  } else {
    const err = new Error("customer Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", fetchCustomers);
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
