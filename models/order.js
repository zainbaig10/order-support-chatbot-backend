import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ['PENDING', 'PROCESSING', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  }
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;