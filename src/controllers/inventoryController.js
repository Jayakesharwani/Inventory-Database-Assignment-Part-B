const db = require('../db/connection');

exports.createInventory = (req, res) => {
  try {
    const { supplier_id, product_name, quantity, price } = req.body;

    if (quantity < 0) {
      return res.status(400).json({ message: "Quantity must be >= 0" });
    }

    if (price <= 0) {
      return res.status(400).json({ message: "Price must be > 0" });
    }

    const supplier = db
      .prepare("SELECT * FROM suppliers WHERE id = ?")
      .get(supplier_id);

    if (!supplier) {
      return res.status(400).json({ error: "Invalid supplier_id" });
    }

    const result = db
      .prepare(`
        INSERT INTO inventory (supplier_id, product_name, quantity, price)
        VALUES (?, ?, ?, ?)
      `)
      .run(supplier_id, product_name, quantity, price);

    res.status(201).json({
      id: result.lastInsertRowid,
      supplier_id,
      product_name,
      quantity,
      price
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getInventory = (req, res) => {
  try {
    const rows = db.prepare(`
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
    `).all();

    res.json({
      success: true,
      count: rows.length,
      data: rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getGroupedInventory = (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT
        s.id AS supplier_id,
        s.name AS supplier_name,
        s.city,
        SUM(i.quantity * i.price) AS total_inventory_value
      FROM suppliers s
      JOIN inventory i ON s.id = i.supplier_id
      GROUP BY s.id, s.name, s.city
      ORDER BY total_inventory_value DESC
    `).all();

    res.json({
      success: true,
      suppliers: rows
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};