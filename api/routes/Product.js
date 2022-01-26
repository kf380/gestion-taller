const express = require('express');
const Product = require ("../models/Product");
const {createProduct, updateProduct, deleteProduct, getProduct,getAllProducts,searchProduct } = require("../controllers/productControllers")
const router = express.Router();


router.get("/",getAllProducts) // Mostrar todos los productos
router.get("/:id",getProduct) // Mostrar un producto
router.get("/search/:name",searchProduct) // Mostrar un producto por su nombre
router.post("/",createProduct) // Crear un producto
router.put("/:id",updateProduct) // Actualizar un producto
router.delete("/:id",deleteProduct) // Eliminar un producto

module.exports=router;