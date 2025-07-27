const db = require('../config/db.js');

//get all leave requests
exports.getAll = async (search = '') => {
  const query = `
    SELECT lr.id, lr.employeeId, lr.date, lr.reason, lr.status, ei.name
    FROM leave_requests lr
    JOIN employees_information ei ON lr.employeeId = ei.employee_id
    WHERE ei.name LIKE ? OR lr.employeeId = ?
    ORDER BY lr.date DESC
  `;
  const [rows] = await db.query(query, [`%${search}%`, search]);
  return rows;
};

//create a new leave request
exports.create = async ({ employeeId, date, reason }) => {
  const query = `INSERT INTO leave_requests (employeeId, date, reason, status) VALUES (?, ?, ?, 'Pending')`;
  const [result] = await db.query(query, [employeeId, date, reason]);
  return result.insertId;
};

//update exisiting leave request
exports.updateStatus = async (id, status) => {
  const query = `UPDATE leave_requests SET status = ? WHERE id = ?`;
  const [result] = await db.query(query, [status, id]);
  return result.affectedRows;
};

// Check if employee exists
exports.employeeExists = async (employeeId) => {
  const query = `SELECT employee_id FROM employees_information WHERE employee_id = ? LIMIT 1`;
  const [rows] = await db.query(query, [employeeId]);
  return rows.length > 0;
};
