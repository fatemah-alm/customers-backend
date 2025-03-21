import { Router } from "express";
import db from "../../db/index.js";
import bcrypt from "bcryptjs";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users;");
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *;",
      [req.body.user_name, req.body.email, hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
