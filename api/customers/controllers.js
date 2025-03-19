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

exports.fetchCustomer = async (customerId, next) => {
  try {
    const customer = await Customer.findById(customerId).populate();
    if (customer) return customer;
    else {
      const err = new Error("Customer not found");
      err.status = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

exports.addCustomer = async (req, res, next) => {
  try {
    if (req.user) {
      const newCustomer = await Customer.create(req.body);
      console.log(newCustomer);
      return res
        .status(201)
        .json({ msg: "customer Added", payload: newCustomer });
    } else {
      return res
        .status(401)
        .json({ message: "you are not authorized to add a customer" });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    if (req.user) {
      await Customer.findByIdAndDelete(customerId);
      res.status(204).end();
    } else {
      res
        .status(401)
        .json({ message: "you are not authorized to delete a customer" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = req.body;
    if (req.user) {
      const updatedCustomer = await Customer.findByIdAndUpdate(
        customerId,
        customer,
        {
          runValidators: true,
          new: true,
        }
      );
      console.log("+++++", updatedCustomer);
      res.status(200).json({
        msg: "customer Updated",
        payload: updatedCustomer,
      });
    } else {
      res
        .status(401)
        .json({ message: "you are not authorized to update a customer" });
    }
  } catch (err) {
    next(err);
  }
};
