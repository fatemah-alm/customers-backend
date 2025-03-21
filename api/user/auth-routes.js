import { Router } from "express";
import db from "../../db/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jwtTokens from "../../utils/jwt-helpers.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (users.rows.length == 0)
      return res.status(401).json({ error: "email is incorrect" });
    //PASSWORD CHECK
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validPassword)
      return res.status(401).json({ error: "incorrect password" });
    // jwt
    let tokens = jwtTokens(users.rows[0]);
    res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
