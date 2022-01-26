const express = require('express');
const Sale = require ("../models/Sale");
const {getSale,getSaleById, createSale, updateSale, deleteSale} = require("../controllers/saleControllers")
const router = express.Router();


router.get("/",getSale)
router.get("/:id",getSaleById)
router.post("/",createSale)
router.put("/:id",updateSale)
router.delete("/:id",deleteSale)

module.exports=router;