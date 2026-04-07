const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.post('/supplier', supplierController.createSupplier);

module.exports = router;