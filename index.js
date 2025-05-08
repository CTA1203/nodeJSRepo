const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb+srv://caophamtuananh:KkuKpTeYGCYVCVEw@backenddb.qegjq3r.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
  console.log('Connected to database');
  app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('Hello from Node API');
});
// Find item
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Add item
app.post('/api/products', async (req, res) => {
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Find item by id
app.get('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Update item by id
app.put('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Delete item by id
app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
