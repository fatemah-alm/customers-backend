import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function jwtTokens({ user_id, username, email }) {
  const user = { user_id, username, email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "24h",
  });
  return { accessToken, refreshToken };
}

export default jwtTokens;
