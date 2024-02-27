const express = require('express');
const{getAllOrders,getOrderById,getOrderByUserEmail,deleteOrder,addOrder}= require ('../controllers/orderControllers');
const { adminAuth } = require('../middleware/adminAuth');
const ordersRouter = express.Router();

ordersRouter.post ('/',addOrder);
ordersRouter.get ('/',adminAuth,getAllOrders);
ordersRouter.get ('/:id',getOrderById);
// ordersRouter.get('/user/:Email', getOrderByUserEmail);
// ordersRouter.delete("/:id", deleteOrder)
ordersRouter.patch("/:id/cancel", deleteOrder);

module.exports = ordersRouter;

