const express = require('express');
const Cheque = require ("../models/Cheque");
const {getCheque,getChequeById, createCheque, updateCheque, deleteCheque} = require("../controllers/chequeControllers")
const router = express.Router();


router.get("/",getCheque)
router.get("/:id",getChequeById)
router.post("/",createCheque)
router.put("/:id",updateCheque)
router.delete("/:id",deleteCheque)

module.exports=router;