// adminController.js

exports.deactivateUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    // Check if the user exists
    const [user] = await pool.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user status to 'inactive'
    const [result] = await pool.query(
      'UPDATE users SET status = "inactive" WHERE user_id = ?',
      [userId]
    );

    if (result.affectedRows === 0) {
      console.log(`No user found with ID: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(`User with ID: ${userId} deactivated successfully`);
    res.status(200).json({ message: 'User deactivated successfully' });
  } catch (error) {
    console.error('Error details:', error); // Log error details
    res.status(500).json({ message: 'Failed to update user status' });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
