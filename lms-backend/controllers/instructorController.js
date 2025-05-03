// controllers/instructorController.js
const db = require('../models/db');

// Add Course
exports.addCourse = async (req, res) => {
  const { course_name, course_description, instructor_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO courses (course_name, course_description, instructor_id) VALUES (?, ?, ?)',
      [course_name, course_description, instructor_id]
    );
    res.status(201).json({ message: "Course added", courseId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Course by ID
exports.getCourse = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM courses WHERE course_id = ?',
      [req.params.courseId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Course
exports.updateCourse = async (req, res) => {
  const { course_name, course_description } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE courses SET course_name = ?, course_description = ? WHERE course_id = ?',
      [course_name, course_description, req.params.courseId]
    );
    res.json({ message: "Course updated", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Course
exports.deleteCourse = async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM courses WHERE course_id = ?',
      [req.params.courseId]
    );
    res.json({ message: "Course deleted", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
