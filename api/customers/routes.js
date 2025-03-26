import { Router } from "express";
import {
  createCustomer,
  findAllCustomers,
  findCustomer,
  updateCustomer,
  deleteCustomer,
  findCustomerByNumber,
} from "./queries.js";
import authenticateToken from "../../middleware/authenticateToken.js";
const router = Router();

router.post("/", authenticateToken, async (req, res, next) => {
  try {
    const customer = await findCustomerByNumber(req.body.number);
    if (customer) {
      return res
        .status(409)
        .json({ message: "Customer number already exists" });
    }
    console.log(req.body.number.toString().length);

    if (req.body.number.toString().length < 9) {
      return res
        .status(403)
        .json({ message: "number must be exactly 9 digits" });
    }

    const result = await createCustomer(req.body);
    if (!result) res.status(403).json({ error: "bad request" });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchTerm = req.query.search || "";
    const gender = req.query.gender || "";
    const skip = (page - 1) * limit;
    const result = await findAllCustomers(searchTerm, gender);
    const paginatedCustomers = result.slice(skip, skip + limit);

    res.status(200).json({
      allCustomers: result,
      customers: paginatedCustomers,
      currentPage: page,
      totalPages: Math.ceil(result.length / limit),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const result = await findCustomer(req.params.id);
    if (!result) {
      res.status(404).json({ msg: "customer not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticateToken, async (req, res, next) => {
  try {
    if (req.body.number.toString().length < 9) {
      return res
        .status(403)
        .json({ message: "number must be exactly 9 digits" });
    }
    const result = await updateCustomer(req.params.id, req.body);
    if (!result) {
      res.status(404).json({ msg: "customer not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const result = await deleteCustomer(req.params.id);
    if (!result) {
      res.status(404).json({ msg: "customer not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
});

export default router;
