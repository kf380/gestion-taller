const express = require('express');
const CashMovement = require ("../models/CashMovement");
const {getMovement,getMovementById, createMovement, updateMovement, deleteMovement} = require("../controllers/cashmovControllers")
const router = express.Router();


router.get("/",getMovement)
router.get("/:id",getMovementById)
router.post("/",createMovement)
router.put("/:id",updateMovement)
router.delete("/:id",deleteMovement)

module.exports=router;

