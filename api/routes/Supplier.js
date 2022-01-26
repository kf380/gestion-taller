const express = require('express');
const Supplier = require ("../models/Supplier");
const {getSupplier,getSupplierById, createSupplier, updateSupplier, deleteSupplier} = require("../controllers/supplierControllers")
const router = express.Router();


router.get("/",getSupplier)
router.get("/:id",getSupplierById)
router.post("/",createSupplier)
router.put("/:id",updateSupplier)
router.delete("/:id",deleteSupplier)

module.exports=router;