import Stripe from "stripe";
import Order from "../models/order.model.js";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1️⃣ Create Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || !items.length)
      return res.status(400).json({ error: "Cart is empty" });

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
    });

    const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const orderItems = items.map(i => ({
      product: i._id || i.productId,
      name: i.name,
      qty: i.qty,
      price: i.price,
      image: i.image,
    }));

    // Save order with isPaid = false
    await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod: "Stripe",
      itemsPrice,
      totalPrice: itemsPrice,
      paymentId: session.id,
      isPaid: false,
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2️⃣ Stripe Webhook
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // express.raw middleware ensures req.body is raw
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Stripe webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const order = await Order.findOne({ paymentId: session.id });
    if (order && !order.isPaid) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: session.id,
        status: "paid",
        email: session.customer_details?.email,
      };
      await order.save();
      console.log("✅ Order marked as paid:", order._id);
    }
  }

  res.json({ received: true });
};


export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, taxPrice = 0, shippingPrice = 0 } = req.body;
    if (!orderItems || !orderItems.length) return res.status(400).json({ message: "No order items" });

    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: req.user._id,
      orderItems: orderItems.map(i => ({
        product: i._id || i.productId,
        name: i.name,
        qty: i.qty,
        price: i.price,
        image: i.image,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("orderItems.product", "name price images");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort("-createdAt").populate("orderItems.product", "name price images");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email username").sort("-createdAt");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = { id: req.body.id, status: req.body.status, email: req.body.email };
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.isDelivered = true;
    order.deliveredAt = new Date();
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markOrderPaid = async (req, res) => {
  try {
    const { sessionId } = req.body;
    if (!sessionId) return res.status(400).json({ message: "Session ID required" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") 
      return res.status(400).json({ message: "Payment not completed" });

    const order = await Order.findOne({ paymentId: sessionId });
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!order.isPaid) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        id: session.id,
        status: "paid",
        email: session.customer_details?.email,
      };
      await order.save();
    }

    res.status(200).json({ message: "Order marked as paid", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};