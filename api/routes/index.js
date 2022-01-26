const express = require('express');
const router = express.Router();
const UserRoutes = require('./User')
const ClientRoutes = require('./Client')
const SupplierRoutes = require('./Supplier')
const ProductRoutes = require('./Product')
const OrderRoutes = require('./Order')
const VehicleRoutes = require('./Vehicle')
const BudgetRoutes = require('./Budget')
const BillRoutes = require('./Bill')
const ShoppingRoutes = require('./Shopping')
const SaleRoutes = require('./Sale')
const CashRoutes = require('./CashMovement')
const ChequeRoutes = require('./Cheque')






router.use('/supplier',SupplierRoutes);
router.use('/client',ClientRoutes);
router.use('/user',UserRoutes);
router.use('/product',ProductRoutes);
router.use('/order',OrderRoutes);
router.use('/vehicle',VehicleRoutes);
router.use('/budget',BudgetRoutes);
router.use('/bill',BillRoutes);
router.use('/shopping',ShoppingRoutes);
router.use('/sale',SaleRoutes);
router.use('/cash',CashRoutes);
router.use('/cheque',ChequeRoutes);


module.exports = router;