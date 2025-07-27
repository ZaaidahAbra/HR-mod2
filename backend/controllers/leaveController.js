const leaveModel = require('../models/leaveModel.js'); // Import the leave model

// Get all leave requests
// Handles GET /api/leave-requests
exports.getLeaveRequests = async (req, res) => {
  try {
    const search = req.query.search || '';
    const requests = await leaveModel.getAll(search);
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leave requests.", error: err.message });
  }
};

// Create a new leave request
// Handles POST /api/leave-requests 
exports.createLeaveRequest = async (req, res) => {
  const { employeeId, date, reason } = req.body;

  try {
    const employeeExists = await leaveModel.employeeExists(employeeId);
    if (!employeeExists) {
      return res.status(400).json({ message: 'Employee does not exist' });
    }

    const id = await leaveModel.create({ employeeId, date, reason });
    res.status(201).json({ id, employeeId, date, reason, status: 'Pending' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating leave request', error: err.message });
  }
};

// Update the status of a leave request
// Handles PUT /api/leave-requests/:id/status/:status
exports.updateLeaveStatus = async (req, res) => {
  const { id, status } = req.params;

  try {
    if (!status || !['Approved', 'Denied', 'Pending'].includes(status)) {
      return res.status(400).json({ message: "Invalid status provided. Must be Approved, Denied, or Pending." });
    }

    const updated = await leaveModel.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ message: "Leave request not found." });
    }

    res.json({ message: `Status updated to ${status} for request ${id}.` });
  } catch (error) {
    console.error("Error in updateLeaveStatus:", error);
    res.status(500).json({ message: "Failed to update status." });
  }
};
