const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const db = new sqlite3.Database("./inventory.db", (err) => {
  if (err) {
    console.error("DB Error:", err.message);
  } else {
    console.log("Connected to SQLite DB");

   
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    db.exec(schema, (err) => {
      if (err) {
        console.error("Schema Error:", err.message);
      } else {
        console.log("Schema created successfully");
      }
    });
  }
});

module.exports = db;