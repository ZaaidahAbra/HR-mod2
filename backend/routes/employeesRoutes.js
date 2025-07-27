const express = require('express');
const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  try {
    const [rows] = await db.execute('SELECT * FROM employees_Information');
    res.json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Failed to fetch employees." });
  }
});

// Add new employee
router.post('/', async (req, res) => {
  const db = req.app.locals.db;
  const { name, position, department, salary, employment_history, email } = req.body;
  try {
    await db.execute(
      'INSERT INTO employees_Information (name, position, department, salary, employment_history, email) VALUES (?, ?, ?, ?, ?, ?)',
      [name, position, department, salary, employment_history, email]
    );
    res.json({ message: 'Employee added' });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Failed to add employee." });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM employees_Information WHERE employee_id = ?', [id]);
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Failed to delete employee." });
  }
});

// Update employee
router.patch('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { name, position, department, salary, employment_history, email } = req.body;

  // Build the update query dynamically based on provided fields
  let queryParts = [];
  let queryValues = [];
  if (name !== undefined) { queryParts.push('name = ?'); queryValues.push(name); }
  if (position !== undefined) { queryParts.push('position = ?'); queryValues.push(position); }
  if (department !== undefined) { queryParts.push('department = ?'); queryValues.push(department); }
  if (salary !== undefined) { queryParts.push('salary = ?'); queryValues.push(salary); }
  if (employment_history !== undefined) { queryParts.push('employment_history = ?'); queryValues.push(employment_history); }
  if (email !== undefined) { queryParts.push('email = ?'); queryValues.push(email); }

  if (queryParts.length === 0) {
    return res.status(400).json({ message: "No fields provided for update." });
  }

  const query = `UPDATE employees_Information SET ${queryParts.join(', ')} WHERE employee_id = ?`;
  queryValues.push(id);

  try {
    await db.execute(query, queryValues);
    res.json({ message: 'Employee updated' });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Failed to update employee." });
  }
});

module.exports = router;
