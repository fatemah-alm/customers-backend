import { Router } from "express";
// const passport = require("passport");
import {
  createCustomer,
  findAllCustomers,
  findCustomer,
  updateCustomer,
  deleteCustomer,
} from "./queries.js";

const router = Router();

router.post("/", async (req, res) => {
  const result = await createCustomer(req.body);
  res.status(201).json(result);
});
router.get("/", async (req, res) => {
  const result = await findAllCustomers();
  res.status(200).json(result);
});

router.get("/:id", async (req, res) => {
  const result = await findCustomer(req.params.id);
  res.status(200).json(result);
});

router.put("/:id", async (req, res) => {
  const result = await updateCustomer(req.params.id, req.body);
  res.status(200).json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await deleteCustomer(req.params.id);
  res.status(200).json(result);
});

export default router;
