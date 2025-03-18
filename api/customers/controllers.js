const Customer = require("../../models/Customer");

exports.fetchCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    return res.json(customers);
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: error.message });
  }
};
