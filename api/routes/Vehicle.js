const express = require('express');
const {createVehicle,updateVehicle, deleteVehicle, getVehicle, getVehicleById} = require("../controllers/vehicleControllers")
const router = express.Router();


router.get("/",getVehicle)
router.get("/:id",getVehicleById)
router.post("/",createVehicle)
router.put("/:id",updateVehicle)
router.delete("/:id",deleteVehicle)

module.exports=router;