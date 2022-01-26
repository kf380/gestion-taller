const express = require('express');
const User = require ("../models/User");
const {createUser, updateUser, deleteUser, getUser} = require("../controllers/userControllers")
const router = express.Router();


router.get("/",getUser)
router.post("/",createUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

module.exports=router;