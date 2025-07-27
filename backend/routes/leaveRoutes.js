const express = require('express');
const router = express.Router();
const controller = require('../controllers/leaveController.js');

// GET all leave requests
router.get('/', controller.getLeaveRequests);

// POST a new leave request
router.post('/', controller.createLeaveRequest);

// PUT update leave request status
router.put('/:id/status/:status', controller.updateLeaveStatus);

module.exports = router;
