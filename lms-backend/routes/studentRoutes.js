const express = require('express');
const router = express.Router();
const pool = require('../models/db'); // Assuming you're using MySQL database

// Route to view student dashboard
router.get('/dashboard', (req, res) => {
  res.send('Welcome to Student Dashboard');
});

// Route to view enrolled courses
// Route to fetch enrolled courses for a student

// Define routes under the '/student' path
// Route to view enrolled courses
router.get('/student/course/view', (req, res) => {
  console.log("Fetching courses from the database...");
  pool.query('SELECT * FROM courses', (error, results) => {
    if (error) {
      console.error('Error fetching courses:', error);
      return res.status(500).json({ message: 'Database error' });
    }

    console.log('Courses fetched:', results); // Check if courses are returned
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).json({ message: 'No courses available' });
    }
  });
});




router.get('/enrolled-courses', async (req, res) => {
  const studentId = req.user.id; // Assuming student ID is in the session or JWT token
  
  try {
    const [courses] = await pool.query(`
      SELECT c.id, c.name, i.name AS instructor_name
      FROM courses c
      JOIN course_enrollments ce ON c.id = ce.course_id
      JOIN users i ON c.instructor_id = i.id
      WHERE ce.student_id = ?
    `, [studentId]);

    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to fetch notes for a course
router.get('/course/:courseId/notes', async (req, res) => {
  const { courseId } = req.params;
  
  try {
    const [notes] = await pool.query('SELECT * FROM notes WHERE course_id = ?', [courseId]);
    res.status(200).json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to fetch quizzes for a course
router.get('/course/:courseId/quizzes', async (req, res) => {
  const { courseId } = req.params;
  
  try {
    const [quizzes] = await pool.query('SELECT * FROM quizzes WHERE course_id = ?', [courseId]);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route to enroll in a course
router.post('/enroll-course', (req, res) => {
  // Add logic for enrolling in a course here
  res.send('Course enrolled successfully');
});

// Route to add a new student
router.post('/add', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // SQL query to insert student data into the database
    const [result] = await pool.query('INSERT INTO students (name, email, password) VALUES (?, ?, ?)', [name, email, password]);

    res.status(201).json({ message: 'Student added successfully', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
});

router.get('/view', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM students');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
  });
  
// Update student info by ID
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const [result] = await pool.query(
        'UPDATE students SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Student updated successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error updating student', error: error.message });
    }
  });

  // Delete student by ID
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await pool.query(
        'DELETE FROM students WHERE id = ?',
        [id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json({ message: 'Student deleted successfully', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
  });
  
  
module.exports = router;
