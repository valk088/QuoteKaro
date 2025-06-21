const express = require('express');
const router = express.Router();
const Transaction = require('../models/payments'); // Ensure this path is correct
const User = require('../models/user'); // Required to potentially populate user data if needed, or for validation

// GET all transactions
// GET /api/transactions
router.get('/', async (req, res) => {
  try {
    // You might want to add query parameters for filtering/pagination here in a real app
    const transactions = await Transaction.find({}).populate('userId', 'studioName email'); // Populate user's studioName and email
    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET a single transaction by ID
// GET /api/transactions/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate('userId', 'studioName email');
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching single transaction:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create a new transaction
// POST /api/transactions
router.post('/', async (req, res) => {
  try {
    const newTransaction = new Transaction(req.body);
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(400).json({ message: 'Failed to create transaction', error: error.message });
  }
});

// PUT (full update) an existing transaction by ID
// PUT /api/transactions/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error('Error updating transaction:', error);
    res.status(400).json({ message: 'Failed to update transaction', error: error.message });
  }
});

// DELETE a transaction by ID
// DELETE /api/transactions/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully', deletedTransactionId: id });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
