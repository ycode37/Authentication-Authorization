import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/authMiddleware.js";

export const userRouter = express.Router();

userRouter.get("/admin", verifyToken, requireRole("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});
userRouter.get(
  "/user",
  verifyToken,
  requireRole("manager", "admin", "user"),
  (req, res) => {
    res.json({ message: "Welcome User" });
  },
);
userRouter.get(
  "/manager",
  verifyToken,
  requireRole("admin", "manager"),
  (req, res) => {
    res.json({ message: "Welcome Manager" });
  },
);
