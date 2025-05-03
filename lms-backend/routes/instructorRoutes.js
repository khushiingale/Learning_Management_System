const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const multer = require('multer');
const path = require('path');
const db = require('../models/db'); // or whatever path your db.js file is in
// Multer setup for file/image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

/**
 * Instructor Dashboard
 */
router.get('/dashboard', (req, res) => {
  res.send('Welcome to Instructor Dashboard');
});

/**
 * Get a course by ID
 */
router.get('/course/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses WHERE course_id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ course: rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Add a new course
 */
router.post('/course/add', upload.single('image'), async (req, res) => {
  const { instructor_id, course_name, course_description } = req.body;
  const course_image = req.file ? req.file.filename : null;

  try {
    const [result] = await pool.query(
      'INSERT INTO courses (course_name, course_description, instructor_id, course_image) VALUES (?, ?, ?, ?)',
      [course_name, course_description, instructor_id, course_image]
    );
    res.status(201).json({ message: 'Course added', courseId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error adding course', error: err.message });
  }
});

/**
 * View all courses by instructor ID
 */
router.get('/course/view/:instructor_id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses WHERE instructor_id = ?', [req.params.instructor_id]);
    res.status(200).json({ courses: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update a course
 */
router.put('/course/update/:id', upload.single('image'), async (req, res) => {
  const { course_name, course_description } = req.body;
  const course_image = req.file ? req.file.filename : null;

  try {
    let query = 'UPDATE courses SET course_name = ?, course_description = ?';
    const values = [course_name, course_description];

    if (course_image) {
      query += ', course_image = ?';
      values.push(course_image);
    }

    query += ' WHERE course_id = ?';
    values.push(req.params.id);

    const [result] = await pool.query(query, values);
    res.status(200).json({ message: 'Course updated', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Delete a course
 */
router.delete('/course/delete/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [req.params.id]);
    res.status(200).json({ message: 'Course deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Add notes to a course
 */


router.get('/course/:courseId/notes', async (req, res) => {
  try {
    const [notes] = await pool.query('SELECT * FROM notes WHERE course_id = ?', [req.params.courseId]);
    res.status(200).json({ notes });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notes', error: err.message });
  }
});

/**
 * View all notes for a course
 */

router.post('/course/:courseId/notes/add', upload.single('file'), async (req, res) => {
  const { note_title, note_content, youtube_link } = req.body;
  const file_name = req.file ? req.file.filename : null;
  const file_path = req.file ? req.file.path : null;

  try {
    const [result] = await pool.query(
      'INSERT INTO notes (course_id, note_title, note_content, file_name, file_path, youtube_link) VALUES (?, ?, ?, ?, ?, ?)',
      [req.params.courseId, note_title, note_content, file_name, file_path, youtube_link]
    );
    res.status(201).json({ message: 'Note added', noteId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error adding note', error: err.message });
  }
});


/**
 * Update a specific note
 */
router.put('/course/:courseId/notes/:noteId', async (req, res) => {
  const { note_title, note_content, youtube_link } = req.body;

  try {
    await pool.query(
      'UPDATE notes SET note_title = ?, note_content = ?, youtube_link = ? WHERE note_id = ? AND course_id = ?',
      [note_title, note_content, youtube_link, req.params.noteId, req.params.courseId]
    );
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err.message });
  }
});

/**
 * Delete a specific note
 */
router.delete('/course/:courseId/notes/:noteId', async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM notes WHERE note_id = ? AND course_id = ?',
      [req.params.noteId, req.params.courseId]
    );
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting note', error: err.message });
  }
});



/**
 * Get all courses (for student view)
 */
router.get('/courses/all', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM courses');
    res.status(200).json({ courses: rows });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
});


router.get('/instructor/:instructorId/notes', async (req, res) => {
  const { instructorId } = req.params;
  try {
    const [notes] = await db.execute('SELECT * FROM notes WHERE instructor_id = ?', [instructorId]);
    res.json(notes);
  } catch (error) {
    console.error('Error fetching instructor notes:', error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});


// Route to get quiz progress
router.get('/api/progress', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT student_name, marks FROM quiz_results
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
