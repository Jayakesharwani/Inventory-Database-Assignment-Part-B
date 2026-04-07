const db = require('../db/connection');

exports.createSupplier = (req, res) => {
  try {
    const { name, city } = req.body;

    if (!name || !city) {
      return res.status(400).json({
        success: false,
        error: "Name and city are required"
      });
    }

    const result = db
      .prepare("INSERT INTO suppliers (name, city) VALUES (?, ?)")
      .run(name, city);

    res.status(201).json({
      success: true,
      id: result.lastInsertRowid,
      name,
      city
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};