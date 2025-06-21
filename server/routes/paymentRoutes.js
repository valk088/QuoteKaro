const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/paymentController');

router.post('/create-order', createOrder);

const { verifyPayment } = require('../controllers/paymentController');
router.post('/verify', verifyPayment);

module.exports = router;
