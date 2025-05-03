const express = require('express');
const router = express.Router();
const db = require('../models/db');  // ✅ Make sure it's 'db', not 'pool'
const adminController = require('../controllers/adminController'); 

// Get all instructors
// GET /api/users/instructors
router.get('/instructors', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'instructor'");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/users/students
router.get('/students', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'student'");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all students
router.get('/students', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE role = 'student'");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Use singular 'instructor' if that's what your route expects
// Backend Route for updating password
// Backend Route for updating password
router.put('/instructor/:id/password', async (req, res) => {  // Changed from :role/:id/password to /instructor/:id/password
  const { id } = req.params; 
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: 'Missing password' });
  }

  try {
    const [result] = await db.execute(
      'UPDATE users SET password = ? WHERE user_id = ? AND role = "instructor"',
      [newPassword, id]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: 'Password updated successfully' });
    } else {
      return res.status(400).json({ message: 'Failed to update password' });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Toggle user status (active/inactive)
// PUT /api/users/admin/user/:id/toggle
router.put('/admin/user/:id/toggle', async (req, res) => {
  const { id } = req.params;

  try {
    // Get current user
    const [rows] = await db.query("SELECT status FROM users WHERE user_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const currentStatus = rows[0].status;
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    // Update status
    await db.query("UPDATE users SET status = ? WHERE user_id = ?", [newStatus, id]);

    res.json({
      status: newStatus,
      message: `User status changed to ${newStatus}`
    });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ message: 'Server error while toggling user status' });
  }
});




// POST /api/users/instructor/login
// Route for instructor login
// POST /api/users/instructor/login
router.post('/instructor/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    // Check active status
    if (!user.active) {
      return res.status(403).json({ message: 'Account deactivated. Contact admin.' });
    }

    // Plain-text password check
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



// POST /api/users/student/login
router.post('/users/student/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    // If user doesn't exist
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const user = rows[0];

    // Check if the user is active
    if (!user.active) {
      return res.status(403).json({ message: 'Your account is deactivated. Contact admin.' });
    }

    // Directly check password (no hashing)
    if (password !== user.password) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});






module.exports = router;


// // Backend Route for toggling user status
// // Toggle user status route
// // Toggle instructor or student status (only these roles allowed)
// // Toggle user status route
// // Route to Deactivate/Activate User Account
// // PUT /api/users/admin/user/:userId/toggle
// router.put('/admin/user/:userId/toggle', async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const [result] = await db.query(
//       'UPDATE users SET active = NOT active WHERE user_id = ?', [userId]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({ message: 'User status updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // POST /api/users/instructor/login
// // Route for instructor login
// // POST /api/users/instructor/login
// router.post('/instructor/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

//     if (rows.length === 0) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const user = rows[0];

//     // Check active status
//     if (!user.active) {
//       return res.status(403).json({ message: 'Account deactivated. Contact admin.' });
//     }

//     // Plain-text password check
//     if (password !== user.password) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// // POST /api/users/student/login
// router.post('/users/student/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

//     // If user doesn't exist
//     if (rows.length === 0) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }

//     const user = rows[0];

//     // Check if the user is active
//     if (!user.active) {
//       return res.status(403).json({ message: 'Your account is deactivated. Contact admin.' });
//     }

//     // Directly check password (no hashing)
//     if (password !== user.password) {
//       return res.status(400).json({ message: 'Invalid username or password' });
//     }

//     res.status(200).json({ message: 'Login successful', user });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });






// module.exports = router;
