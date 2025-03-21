import db from "../../db/index.js";
import bcrypt from "bcryptjs";

// Assuming a simple User table structure
export const createUser = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING username;`;
  try {
    const result = await db.query(query, [username, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findUserByUsername = async (username) => {
  const query = `
    SELECT * FROM users
    WHERE username = $1;`;
  try {
    const result = await db.query(query, [username]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};
