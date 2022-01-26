const express = require('express');
const Bill = require ("../models/Bill");
const {getBill,getBillById, createBill, updateBill, deleteBill} = require("../controllers/billControllers")
const router = express.Router();


router.get("/",getBill)
router.get("/:id",getBillById)
router.post("/",createBill)
router.put("/:id",updateBill)
router.delete("/:id",deleteBill)

module.exports=router;