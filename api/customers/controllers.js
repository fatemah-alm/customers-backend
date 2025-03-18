const Customer = require("../../models/Customer");

exports.fetchCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find();
    return res.json(customers);
  } catch (error) {
    next(error);
    return res.status(500).json({ message: error.message });
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
    const newCustomer = await Customer.create(req.body);
    console.log(newCustomer);

    return res
      .status(201)
      .json({ msg: "customer Added", payload: newCustomer });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

exports.deleteCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    // const customer = await Customer.findById(customerId);

    await Customer.findByIdAndDelete(customerId);
    res.status(204).end();
    // if (String(req.user._id) === String(customer.owner._id)) {
    //   const profileId = customer.owner.profile;
    //   let
    //   foundProfile = await Profile.findById(profileId);
    // foundProfile.customers = foundProfile.customers.filter(
    //   (customer) => JSON.stringify(customer) !== JSON.stringify(customerId)
    // );
    // await Profile.findByIdAndUpdate({ _id: profileId }, { ...foundProfile });
    // await req.customer.remove();
    // res.status(204).end();
    // } else {
    //   const error = new Error("you are not the owner of this customer!");
    //   error.status = 401;
    //   next(error);
    // }
  } catch (err) {
    next(err);
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    // const id = req.trip._id;
    const customer = req.body;

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
  } catch (err) {
    next(err);
  }
};
