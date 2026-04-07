const db = require('../db/connection');

 
exports.createInventory = (req, res) => {
  const { supplier_id, product_name, quantity, price } = req.body;

   
  if (!supplier_id || !product_name || quantity === undefined || price === undefined) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  
  if (quantity < 0) {
    return res.status(400).json({
      success: false,
      error: "Quantity must be >= 0"
    });
  }

  
  if (price <= 0) {
    return res.status(400).json({
      success: false,
      error: "Price must be > 0"
    });
  }

 
  db.get(`SELECT * FROM suppliers WHERE id = ?`, [supplier_id], (err, supplier) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (!supplier) {
      return res.status(400).json({
        success: false,
        error: "Invalid supplier_id"
      });
    }

   
    const query = `
      INSERT INTO inventory (supplier_id, product_name, quantity, price)
      VALUES (?, ?, ?, ?)
    `;

    db.run(query, [supplier_id, product_name, quantity, price], function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err.message
        });
      }

      res.status(201).json({
        success: true,
        message: "Inventory created successfully",
        data: {
          id: this.lastID,
          supplier_id,
          product_name,
          quantity,
          price
        }
      });
    });
  });
};


 
exports.getInventory = (req, res) => {
  const query = `
    SELECT 
      i.id,
      i.product_name,
      i.quantity,
      i.price,
      (i.quantity * i.price) AS total_value,
      s.id AS supplier_id,
      s.name AS supplier_name,
      s.city AS supplier_city
    FROM inventory i
    JOIN suppliers s ON i.supplier_id = s.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (rows.length === 0) {
      return res.json({
        success: true,
        message: "No inventory found",
        data: []
      });
    }

    res.json({
      success: true,
      count: rows.length,
      timestamp: new Date(),
      data: rows
    });
  });
};

 
exports.getGroupedInventory = (req, res) => {
  const query = `
    SELECT
      s.id AS supplier_id,
      s.name AS supplier_name,
      s.city,
      SUM(i.quantity * i.price) AS total_inventory_value
    FROM suppliers s
    JOIN inventory i ON s.id = i.supplier_id
    GROUP BY s.id, s.name, s.city
    ORDER BY total_inventory_value DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err.message
      });
    }

    if (rows.length === 0) {
      return res.json({
        success: true,
        message: "No supplier data found",
        suppliers: []
      });
    }

    res.json({
      success: true,
      timestamp: new Date(),
      suppliers: rows
    });
  });
};