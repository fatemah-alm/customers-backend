// const Customer = require("../../models/Customer");
import db from "../../db/index.js";

// exports.fetchCustomers = async (req, res, next) => {
//   try {
//     const customers = await Customer.find();
//     return res.json(customers);
//   } catch (error) {
//     next(error);
//   }
// };

// exports.fetchCustomer = async (req, res, next) => {
//   try {
//     const { customerId } = req.params;

//     const customer = await Customer.findById(customerId);
//     if (customer) res.status(200).json(customer);
//     else {
//       const err = new Error("Customer not found");
//       err.status = 404;
//       next(err);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.addCustomer = async (req, res, next) => {
//   try {
//     if (req.user) {
//       console.log(req.user);
//       const newCustomer = await Customer.create(req.body);
//       console.log(newCustomer);
//       res.status(201).json(newCustomer);
//     } else {
//       return res
//         .status(401)
//         .json({ message: "you are not authorized to add a customer" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// exports.deleteCustomer = async (req, res, next) => {
//   try {
//     const { customerId } = req.params;
//     if (req.user) {
//       await Customer.findByIdAndDelete(customerId);
//       res.status(204).end();
//     } else {
//       res
//         .status(401)
//         .json({ message: "you are not authorized to delete a customer" });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// exports.updateCustomer = async (req, res, next) => {
//   try {
//     const { customerId } = req.params;

//     const customer = req.body;
//     if (req.user) {
//       const updatedCustomer = await Customer.findByIdAndUpdate(
//         customerId,
//         customer,
//         {
//           runValidators: true,
//           new: true,
//         }
//       );
//       console.log("+++++", updatedCustomer);
//       res.status(200).json({
//         msg: "customer Updated",
//         payload: updatedCustomer,
//       });
//     } else {
//       res
//         .status(401)
//         .json({ message: "you are not authorized to update a customer" });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// here is for sql
export const createCustomer = async ({ name, number, dob, gender }) => {
  const query = `
  INSERT INTO 
    customers (name, number, dob, gender)
  VALUES 
    ($1,$2,$3,$4)
    RETURNING *;`;

  const result = await db.query(query, [name, number, dob, gender]);

  return result.rows[0];
};

export const findCustomer = async (id) => {
  const query = `
  SELECT * FROM 
  customers 
  WHERE 
  id = $1;`;
  const result = await db.query(query, [+id]);
  return result.rows[0];
};

export const findAllCustomers = async () => {
  const query = `
  SELECT * FROM
  customers;`;
  const result = await db.query(query);
  return result.rows;
};

export const updateCustomer = async (id, { name, number, dob, gender }) => {
  const query = `
  UPDATE 
    customers
  SET 
    name = $2,
    number = $3,
    dob = $4,
    gender = $5
  WHERE
    id = $1
  RETURNING *;
  `;
  const result = await db.query(query, [+id, name, number, dob, gender]);
  return result.rows[0];
};

export const deleteCustomer = async (id) => {
  const query = `
  DELETE FROM
    customers
  WHERE 
    id = $1
  RETURNING *;`;
  const result = await db.query(query, [+id]);
  return result.rows[0];
};

// export default {
//   createCustomer,
//   findAllCustomers,
//   findCustomer,
//   updateCustomer,
//   deleteCustomer,
// };
