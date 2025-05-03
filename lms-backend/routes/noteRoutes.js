const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const multer = require('multer');
const path = require('path');
const db = require('../models/db'); // 👈 Make sure this path is correct

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// 🔥 This is the key fix: match `note_file` to frontend field name
router.post('/upload/:courseId', upload.single('note_file'), noteController.createNote);

// Other routes
router.get('/course/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const [notes] = await db.execute(
      'SELECT * FROM notes WHERE course_id = ? ORDER BY created_at DESC',
      [courseId]
    );
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching notes for course' });
  }
});


router.get('/courses/:courseId/notes', async (req, res) => {
  const courseId = req.params.courseId;
  console.log("📚 Student accessing notes for course", courseId);
  try {
    const [rows] = await db.query('SELECT * FROM notes WHERE course_id = ?', [courseId]);
    res.json({ notes: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching notes' });
  }
});



// PUT route to update a note
router.put('/notes/:noteId', upload.single('note_file'), async (req, res) => {
  const { noteId } = req.params;
  const { note_title, note_content } = req.body;
  const note_file = req.file ? req.file.filename : null;

  try {
    let query;
    let params;

    if (note_file) {
      query = 'UPDATE notes SET note_title = ?, note_content = ?, note_file = ? WHERE note_id = ?';
      params = [note_title, note_content, note_file, noteId];
    } else {
      query = 'UPDATE notes SET note_title = ?, note_content = ? WHERE note_id = ?';
      params = [note_title, note_content, noteId];
    }

    await db.execute(query, params);
    res.json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error('Failed to update note:', error);
    res.status(500).json({ message: 'Failed to update note' });
  }
});

router.delete('/notes/:noteId', noteController.deleteNote);

module.exports = router;
