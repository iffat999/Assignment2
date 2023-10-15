

const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Import your product model




module.exports = router;


// Get a list of all products
router.get('/', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


// Get a single product by ID
router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId); // Assuming you have a Product model
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update a product by ID
router.put('/:productId', async (req, res) => {
    const productId = req.params.productId;
    const updates = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
  
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  



// Delete a product by ID
router.delete('/:productId', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndRemove(req.params.productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;






