import { Router } from "express";
import {
  createCustomer,
  findAllCustomers,
  findCustomer,
  updateCustomer,
  deleteCustomer,
} from "./queries.js";
import authenticateToken from "../../middleware/passport.js";
const router = Router();

router.post("/", authenticateToken, async (req, res) => {
  try {
    const result = await createCustomer(req.body);
    if (!result) res.status(403).json({ error: "bad request" });

    res.status(201).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});
router.get("/", authenticateToken, async (req, res) => {
  try {
    const result = await findAllCustomers();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await findCustomer(req.params.id);
    if (!result) {
      res.status(404).json({ msg: "customer not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await updateCustomer(req.params.id, req.body);
    if (!result) {
      res.status(404).json({ msg: "customer not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await deleteCustomer(req.params.id);
    if (!result) {
      res.status(404).json({ msg: "customer not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
