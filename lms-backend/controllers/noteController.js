// const db = require('../models/db');

// // Upload a new note
// exports.uploadNote = async (req, res) => {
//   const { title, description, youtubeLink } = req.body;
//   const courseId = req.params.courseId;
//   const filePath = req.file ? req.file.path : null;
//   const fileName = req.file ? req.file.originalname : null;

//   if (!filePath && !youtubeLink) {
//     return res.status(400).json({ message: "Please upload a file or provide a YouTube link." });
//   }

//   try {
//     await db.execute(
//       `INSERT INTO notes (course_id, file_name, file_path, youtube_link, note_title, note_content) 
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [courseId, fileName, filePath, youtubeLink, title, description]
//     );
//     res.status(201).json({ message: 'Note uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to upload note' });
//   }
// };

// // Fetch all notes
// exports.getAllNotes = async (req, res) => {
//   try {
//     const [notes] = await db.execute('SELECT * FROM notes');
//     res.status(200).json(notes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch notes' });
//   }
// };

// // Fetch notes by course ID
// exports.getNotesByCourseId = async (req, res) => {
//   const { courseId } = req.params;
//   try {
//     const [notes] = await db.execute('SELECT * FROM notes WHERE course_id = ?', [courseId]);
//     res.status(200).json(notes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to fetch notes' });
//   }
// };
// // Update an existing note
// exports.updateNote = async (req, res) => {
//   const { noteId, title, description, youtubeLink } = req.body;
//   const filePath = req.file ? req.file.path : null;
//   const fileName = req.file ? req.file.originalname : null;

//   try {
//     // Update note in the database
//     await db.execute(
//       `UPDATE notes SET note_title = ?, note_content = ?, youtube_link = ?, file_name = ?, file_path = ? WHERE note_id = ?`,
//       [title, description, youtubeLink, fileName, filePath, noteId]
//     );
//     res.status(200).json({ message: 'Note updated successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to update note' });
//   }
// };

// // Delete a note
// exports.deleteNote = async (req, res) => {
//   const noteId = req.params.noteId;

//   try {
//     // Delete note from the database
//     await db.execute('DELETE FROM notes WHERE note_id = ?', [noteId]);
//     res.status(200).json({ message: 'Note deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to delete note' });
//   }
// };

const db = require('../models/db');

// Upload a new note
exports.createNote = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);
    console.log('Incoming file:', req.file);

    const { note_title, note_content, instructor_id } = req.body;
    const course_id = req.params.courseId;
    const note_file = req.file?.filename || null;

    if (!note_title || !note_content || !course_id || !instructor_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const query = `
      INSERT INTO notes (note_title, note_content, note_file, course_id, instructor_id)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      note_title,
      note_content,
      note_file,
      course_id,
      instructor_id,
    ]);

    res.status(201).json({ message: 'Note uploaded successfully', noteId: result.insertId });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload note', details: error.message });
  }
};






// Get notes by course
exports.getNotesByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const [notes] = await db.execute('SELECT * FROM notes WHERE course_id = ?', [courseId]);
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// Update a note
// Update a note
exports.updateNote = async (req, res) => {
  const { note_title, note_content } = req.body;
  const noteId = req.params.noteId;
  const fileName = req.file ? req.file.filename : null;

  try {
    await db.execute(
      'UPDATE notes SET note_title = ?, note_content = ?, note_file = ? WHERE note_id = ?',
      [note_title, note_content, fileName, noteId]
    );
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update note' });
  }
};


// Delete a note
exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;

  try {
    await db.execute('DELETE FROM notes WHERE note_id = ?', [noteId]);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete note' });
  }
};
