const express = require('express');
const Budget = require ("../models/Budget");
const {getBudget,getBudgetById, createBudget, updateBudget, deleteBudget} = require("../controllers/budgetControllers")
const router = express.Router();


router.get("/",getBudget)
router.get("/:id",getBudgetById)
router.post("/",createBudget)
router.put("/:id",updateBudget)
router.delete("/:id",deleteBudget)

module.exports=router;