const express = require('express');
const Order = require ("../models/Order");
const {createOrder,getAllOrder, getOrderById, updateOrder, deleteOrder} = require("../controllers/orderControllers")
const router = express.Router();


router.get("/",getAllOrder)
router.get("/:id",getOrderById)
router.post("/",createOrder)
router.put("/:id",updateOrder)
router.delete("/:id",deleteOrder)

module.exports=router;