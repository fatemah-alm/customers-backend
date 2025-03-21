import { Router } from "express";
import { registerUser, getUsers, loginUser } from "./queries.js";

const router = Router();

router.get("/", getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

export default router;
