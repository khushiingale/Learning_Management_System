const pool = require('.../models/db'); // Ensure this points to the correct path for db.js

// Get all notes
const getAllNotes = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM notes'); // Ensure the table is correct
    console.log('Fetched notes: ', rows); // Log the fetched notes
    return rows;
  } catch (err) {
    console.error('Error fetching notes: ', err);
    throw err; // Rethrow to be caught in the controller
  }
};

// Get note by ID
const getNoteById = async (noteId) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [noteId]);
    return rows;
  } catch (err) {
    console.error('Error fetching note by ID: ', err);
    throw err;
  }
};

// Updated createNote
const createNote = async (noteData) => {
    try {
      const { course_id, note_title, note_content, youtube_link, file_path } = noteData;
      const [result] = await pool.query(
        `INSERT INTO notes (course_id, note_title, note_content, youtube_link, file_path)
         VALUES (?, ?, ?, ?, ?)`,
        [course_id, note_title, note_content, youtube_link, file_path]
      );
      return result;
    } catch (err) {
      console.error('Error creating note: ', err);
      throw err;
    }
  };
  

module.exports = { getAllNotes, getNoteById, createNote };
