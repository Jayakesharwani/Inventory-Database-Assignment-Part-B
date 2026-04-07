const express = require('express');
const cors = require('cors');
const fs = require('fs');
const db = require('./db/connection');


const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});
 
app.use(cors());
app.use(express.json());
 
const schema = fs.readFileSync('./src/db/schema.sql', 'utf8');

db.exec(schema, (err) => {
  if (err) {
    console.error("Schema error:", err.message);
  } else {
    console.log("Tables ready");
  }
});

 
app.use('/api', supplierRoutes);
app.use('/api', inventoryRoutes);
 
 
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});