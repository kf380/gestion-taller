const express = require('express');
const Shopping = require ("../models/Shopping");
const {getShopping,getShoppingById, createShopping, updateShopping, deleteShopping} = require("../controllers/shoppingControllers")
const router = express.Router();


router.get("/",getShopping)
router.get("/:id",getShoppingById)
router.post("/",createShopping)
router.put("/:id",updateShopping)
router.delete("/:id",deleteShopping)

module.exports=router;