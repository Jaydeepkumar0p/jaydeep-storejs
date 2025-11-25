import express from "express";
import {
  createOrder,
  getOrderById,
  getMyOrders,
  getAllOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  deleteOrder,
  createCheckoutSession,
  stripeWebhook,
  markOrderPaid,
} from "../controllers/order.control.js";

import { AuthHandle, AdminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/stripe-checkout", AuthHandle, createCheckoutSession);
router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);


router.post("/", AuthHandle, createOrder);
router.get("/mine", AuthHandle, getMyOrders);
router.get("/:id", AuthHandle, getOrderById);
router.put("/:id/pay", AuthHandle, updateOrderToPaid);
router.put("/:id/deliver", AuthHandle, AdminMiddleware, updateOrderToDelivered);
router.get("/", AuthHandle, AdminMiddleware, getAllOrders);
router.delete("/:id", AuthHandle, AdminMiddleware, deleteOrder);
router.post("/mark-paid", AuthHandle, markOrderPaid);



export default router;
