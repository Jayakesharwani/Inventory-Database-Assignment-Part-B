# 📦 Inventory Database API

A backend system to manage suppliers and their inventory. This project allows suppliers to list surplus stock and enables buyers to view inventory data through APIs.

---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **SQLite**
* **better-sqlite3**
* **Postman (API testing)**

--- 

📂 Project Structure

inventory-database-project/
├── src/
│   ├── db/
│   │   ├── schema.sql
│   │   └── connection.js
│   ├── routes/
│   │   ├── supplierRoutes.js
│   │   └── inventoryRoutes.js
│   ├── controllers/
│   │   ├── supplierController.js
│   │   └── inventoryController.js
│   └── server.js
├── package.json
└── README.md

---

## ✨ Features

* Create suppliers
* Add inventory items linked to suppliers
* Validate data (supplier existence, quantity, price)
* View inventory with supplier details
* Group inventory by supplier
* Calculate total inventory value (`quantity × price`)
* Sort suppliers by total inventory value (descending)

---

## 🗄️ Database Schema Explanation

This project uses two tables:

### 1. Suppliers Table

Stores supplier information.

| Field | Type                  | Description        |
| ----- | --------------------- | ------------------ |
| id    | INTEGER (Primary Key) | Unique supplier ID |
| name  | TEXT                  | Supplier name      |
| city  | TEXT                  | Supplier city      |

---

### 2. Inventory Table

Stores inventory items linked to suppliers.

| Field        | Type                  | Description                           |
| ------------ | --------------------- | ------------------------------------- |
| id           | INTEGER (Primary Key) | Unique inventory ID                   |
| supplier_id  | INTEGER               | Foreign key referencing suppliers(id) |
| product_name | TEXT                  | Name of the product                   |
| quantity     | INTEGER               | Number of items available             |
| price        | REAL                  | Price per unit                        |

---

### 🔗 Relationship

* One supplier can have multiple inventory items
* Implemented using a **foreign key (`supplier_id`)**

---

## 🧠 Why SQL (SQLite)?

SQL was chosen because:

* The data has a **structured relationship** (supplier → inventory)
* It supports **foreign keys**, ensuring data integrity
* It allows powerful queries like:

  * JOINs
  * GROUP BY
  * Aggregations (`SUM`)
* SQLite is lightweight and perfect for small backend projects

**The better-sqlite3 library was used for improved performance and stability during deployment.**

---

## ⚡ Indexing / Optimization Suggestion

An index is added on the `supplier_id` field in the inventory table:

```sql
CREATE INDEX idx_supplier_id ON inventory(supplier_id);
```

### Why?

* Improves performance of:

  * JOIN queries
  * Grouped queries
* Speeds up lookups when filtering inventory by supplier

---

## 📡 API Endpoints

### ➕ Create Supplier

```
POST /api/supplier
```

**Body:**

```json
{
  "name": "ABC Traders",
  "city": "Delhi"
}
```

---

### ➕ Create Inventory

```
POST /api/inventory
```

**Body:**

```json
{
  "supplier_id": 1,
  "product_name": "Laptop",
  "quantity": 10,
  "price": 50000
}
```

---

### 📄 Get All Inventory

```
GET /api/inventory
```

Returns inventory with supplier details and computed total value.

---

### 📊 Grouped Inventory (Required Query)

```
GET /api/inventory/grouped
```

Returns:

* Inventory grouped by supplier
* Sorted by total inventory value (`quantity × price`)

---

## 🔒 Validation Rules

* Inventory must belong to a valid supplier
* Quantity must be **≥ 0**
* Price must be **> 0**
* All fields are required

---

## 🧪 Testing

Use **Postman** to test all APIs:

* Create supplier
* Add inventory
* Test invalid cases:

  * Invalid supplier
  * Negative quantity
  * Invalid price
* Fetch inventory
* Test grouped query

---

## ▶️ How to Run Locally

```bash
npm install 
npm run dev
OR
npm start
```

Server will start on:

```
http://localhost:5000
```

---

## 📌 Future Improvements

* Add authentication (supplier vs buyer)
* Build frontend UI
* Pagination for large datasets
* Advanced filtering & search

---

## 📎 Submission Links

* **GitHub Repo:** https://github.com/Jayakesharwani/Inventory-Database-Assignment-Part-B
* **Deployed Backend:** https://inventory-database-assignment-part-b.onrender.com

---

## 👩‍💻 Author

* Jaya Kesharwani 
