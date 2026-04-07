const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/inventory', inventoryController.createInventory);
router.get('/inventory', inventoryController.getInventory);
router.get('/inventory/grouped', inventoryController.getGroupedInventory);

module.exports = router;