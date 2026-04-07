const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

// Create/Open DB
const db = new Database("inventory.db");

// Enable foreign keys
db.exec("PRAGMA foreign_keys = ON");

try {
  console.log("Connected to SQLite DB");

  // Read schema file
  const schemaPath = path.join(__dirname, "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");

  // Execute schema
  db.exec(schema);

  console.log("Schema created successfully");
} catch (err) {
  console.error("DB Error:", err.message);
}

module.exports = db;