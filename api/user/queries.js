import db from "../../db/index.js";
import bcrypt from "bcryptjs";
import jwtTokens from "../../utils/jwt-helpers.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await db.query("SELECT * FROM users;");
    res.json({ users: users.rows });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    next(error);
  }
};

export const registerUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *;",
      [req.body.user_name, req.body.email, hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
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
    next(error);
  }
};
