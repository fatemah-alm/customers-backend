import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; //Bearer token
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ error: "null token" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}

export default authenticateToken;
