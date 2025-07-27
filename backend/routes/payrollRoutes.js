// this is the payroll routes -z
const express = require('express');
const router = express.Router();
const { getPayroll } = require('../controllers/payrollController');

router.get('/', getPayroll); // GET /api/payroll

module.exports = router;
