import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./config/conn.js";
import path from "path";
import fs from "fs";

import userAuthRputes from "./routes/user.auth.route.js";
import productRoute from "./routes/product.route.js";
import categoryRoute from "./routes/category.route.js";
import orderRoute from "./routes/order.route.js";

dotenv.config();
const __dirname = path.resolve();

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, origin);
      }
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

app.use('/api/order/stripe-webhook', express.raw({ type: 'application/json' }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/user", userAuthRputes);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);

 const shouldServeFrontend = process.env.SERVE_FRONTEND === "true";
if (shouldServeFrontend) {
  const distPath = path.join(__dirname, "../frontend/dist");
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get(/(.*)/, (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.warn(
      "SERVE_FRONTEND=true but frontend/dist not found. Static serving skipped."
    );
  }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  Connection();
});
