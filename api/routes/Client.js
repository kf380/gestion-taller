const express = require('express');
const Client = require ("../models/Client");
const {getClient,getClientById, createClient, updateClient, deleteClient} = require("../controllers/clientControllers")
const router = express.Router();


router.get("/",getClient)
router.get("/:id",getClientById)
router.post("/",createClient)
router.put("/:id",updateClient)
router.delete("/:id",deleteClient)

module.exports=router;