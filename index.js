const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory customer data
let customers = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25 }
];

// GET all customers
app.get("/customers", (req, res) => {
  res.status(200).json(customers);
});

// GET customer by ID
app.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.status(200).json(customer);
});

// POST create new customer
app.post("/customers", (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newCustomer = {
    id: customers.length ? customers[customers.length - 1].id + 1 : 1,
    name,
    email,
    age
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

// PUT update customer
app.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, age } = req.body;

  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customer.name = name || customer.name;
  customer.email = email || customer.email;
  customer.age = age || customer.age;

  res.status(200).json(customer);
});

// DELETE customer
app.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Customer not found" });
  }

  customers.splice(index, 1);
  res.status(200).json({ message: "Customer deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
