require('dotenv').config(); // Load environment variables from .env file FIRST
const express = require ('express');
const cors = require ('cors');
const app = express();
const pool = require ('./config/db.js')
//import routes
const leaveRoutes = require ('./routes/leaveRoutes.js');
const employeesRoutes = require('./routes/employeesRoutes.js');
const authRoutes = require ('./routes/authRoutes.js');
const payrollRoutes = require('./routes/payrollRoutes.js')
const authenticate = require ('./middleware/authMiddleware.js')

// Middleware
app.use(cors()); // Allows cross-origin requests from your frontend
app.use(express.json()); // Parses JSON request bodies

//API routes
// Use the leave routes
app.use('/api/leave-requests', leaveRoutes); // All routes defined in leaveRoutes.js will be prefixed with /api/leave-requests

//New emp route
app.use('/api/employees' , employeesRoutes);

//use payroll 
app.use('/api/payroll', payrollRoutes);

//Auth routes
app.use('/api/auth', authRoutes);

// Example of a protected route
app.get('/api/protected-route', authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you accessed a protected route! Your ID: ${req.user.id}` });
});

// Add this temporary test route:
app.get('/test', (req, res) => {
  res.send('leave management route is working!');
});


// Error handling middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000
app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  try {
    // Test database connection
    await pool.getConnection();
    console.log('Connected to MySQL database successfully.');
  } catch (error) {
    console.error('Failed to connect to MySQL database:', error.message);
  }
});
