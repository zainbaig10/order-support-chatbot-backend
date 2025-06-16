import Order from "../models/order.js";

// Create order
export const createOrder = async (req, res) => {
  const { orderId, status = 'PENDING' } = req.body;
  try {
    const order = new Order({ orderId, status });
    await order.save();
    res.status(201).json({ message: "✅ Order created", order });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to create order", error: err.message });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    order
      ? res.json(order)
      : res.status(404).json({ message: "⚠️ Order not found" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching order", error: err.message });
  }
};

// Get all orders
export const getAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "❌ Error getting orders", error: err.message });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status: 'CANCELLED' },
      { new: true }
    );
    order
      ? res.json({ message: "✅ Order cancelled", order })
      : res.status(404).json({ message: "⚠️ Order not found" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error cancelling order", error: err.message });
  }
};

// Update order status
export const updateOrder = async (req, res) => {
  const { status } = req.body;
  if (!['PENDING', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'].includes(status)) {
    return res.status(400).json({ message: "⚠️ Invalid status value" });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true }
    );
    order
      ? res.json({ message: "✅ Order updated", order })
      : res.status(404).json({ message: "⚠️ Order not found" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error updating order", error: err.message });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const result = await Order.findOneAndDelete({ orderId: req.params.id });
    result
      ? res.json({ message: "🗑️ Order deleted" })
      : res.status(404).json({ message: "⚠️ Order not found" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting order", error: err.message });
  }
};
