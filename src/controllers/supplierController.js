const db = require('../db/connection');

exports.createSupplier = (req, res) => {
  const { name, city } = req.body;

  if (!name || !city) {
    return res.status(400).json({ message: "All fields required" });
  }

  const query = `INSERT INTO suppliers (name, city) VALUES (?, ?)`;

  db.run(query, [name, city], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      name,
      city
    });
  });
};