// adminRoutes.js

const express = require('express');
const router = express.Router();
const { deactivateUser, getAllUsers } = require('../controllers/adminController');

// Define your routes with proper handlers
router.post('/deactivateUser', deactivateUser);  // Ensure deactivateUser is a function
router.get('/getAllUsers', getAllUsers);  // Ensure getAllUsers is a function

module.exports = router;
