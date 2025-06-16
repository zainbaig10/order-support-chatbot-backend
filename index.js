import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import orderRoutes from "./routes/orderRoutes.js";
import Order from "./models/order.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB error:", err));

// Routes
app.use("/", orderRoutes);

// Webhook route for Dialogflow
app.post("/", async (req, res) => {
  const tag = req.body?.fulfillmentInfo?.tag || "";
  const parameters = req.body?.sessionInfo?.parameters || {};
  const orderId = parameters?.order_id || "UNKNOWN";

  let message = "";

  try {
    if (tag === "track-order") {
      const order = await Order.findOne({ orderId });
      message = order
        ? `📦 Order ${orderId} is currently ${order.status
            .replace(/_/g, " ")
            .toLowerCase()}.`
        : `⚠️ Order ${orderId} not found.`;
    } else if (tag === "cancel-order") {
      const order = await Order.findOneAndUpdate(
        { orderId },
        { status: "CANCELLED" },
        { new: true }
      );
      message = order
        ? `❌ Order ${orderId} has been successfully cancelled.`
        : `⚠️ Order ${orderId} not found.`;
    } else {
      message = "⚠️ Unrecognized request.";
    }

    return res.json({
      fulfillment_response: {
        messages: [{ text: { text: [message] } }],
      },
    });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.json({
      fulfillment_response: {
        messages: [{ text: { text: ["⚠️ Server error."] } }],
      },
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
