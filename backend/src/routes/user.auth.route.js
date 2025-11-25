import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/auth.user.controller.js";
import { AuthHandle, AdminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createUser);
router.post("/login", loginUser);

// Authenticated
router.post("/logout", AuthHandle, logoutUser);
router.get("/profile", AuthHandle, getUserProfile);
router.put("/profile", AuthHandle, updateUserProfile);

// Admin only
router.get("/all", AuthHandle, AdminMiddleware, getAllUsers); // ✅ lowercase 'all'
router.get("/:id", AuthHandle, AdminMiddleware, getUser);
router.put("/:id", AuthHandle, AdminMiddleware, updateUser);
router.delete("/:id", AuthHandle, AdminMiddleware, deleteUser);

export default router;
