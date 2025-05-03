const pool = require('../models/db');



// User signup
exports.signup = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const [rows] = await pool.query('INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)', [username, password, email, role]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// User login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account is deactivated' });
    }

    if (password === user.password) { // Ideally use bcrypt for real apps
      req.session.userId = user.user_id;
      req.session.role = user.role;
      res.status(200).json({ message: 'Login successful', role: user.role });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Deactivate user
exports.deactivateUser = async (req, res) => {
  const { userId } = req.body;

  try {
    await pool.query('UPDATE users SET status = "inactive" WHERE user_id = ?', [userId]);
    res.status(200).json({ message: 'User deactivated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Activate user
exports.activateUser = async (req, res) => {
  const { userId } = req.body;

  try {
    await pool.query('UPDATE users SET status = "active" WHERE user_id = ?', [userId]);
    res.status(200).json({ message: 'User activated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

