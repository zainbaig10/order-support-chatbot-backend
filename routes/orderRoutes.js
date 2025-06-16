import express from 'express';
import {
  createOrder,
  getOrder,
  getAllOrders,
  cancelOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/get-order/:id', getOrder);
router.get('/get-orders', getAllOrders);
router.patch('/cancel-order/:id', cancelOrder);
router.patch('/update-order/:id', updateOrder);
router.delete('/delete-order/:id', deleteOrder);

export default router;
