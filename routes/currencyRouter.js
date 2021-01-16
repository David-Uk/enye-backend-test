const express = require('express');

const CurrencyConversion = require('../controllers/CurrencyConversion');

const router = express.Router();


// GET /api/rates
router.get('/api/rates', CurrencyConversion.getCurrencyValues);


module.exports = router;