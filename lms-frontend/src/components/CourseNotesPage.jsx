import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CourseNotesPage() {
  const { courseId } = useParams();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteFile, setNoteFile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, [courseId]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/course/${courseId}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('note_title', noteTitle);
    formData.append('note_content', noteContent);
    if (noteFile) formData.append('note_file', noteFile);

    try {
      if (editingNoteId) {
        await axios.put(`http://localhost:5000/api/notes/notes/${editingNoteId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Note updated successfully!');
      } else {
        formData.append('course_id', courseId);
        formData.append('instructor_id', 1); // Replace with actual ID later
        await axios.post(`http://localhost:5000/api/notes/upload/${courseId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Note uploaded successfully!');
      }

      setNoteTitle('');
      setNoteContent('');
      setNoteFile(null);
      setEditingNoteId(null);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error.response?.data || error.message);
      alert('Failed to save note.');
    }
  };

  const handleEdit = (note) => {
    setNoteTitle(note.note_title);
    setNoteContent(note.note_content);
    setNoteFile(null); // File inputs can't be pre-filled
    setEditingNoteId(note.note_id);
  };

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/notes/notes/${noteId}`);
      alert('Note deleted');
      fetchNotes();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete note');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>
          {editingNoteId ? 'Edit Note' : `Upload Note for Course ${courseId}`}
        </h2>

        <input
          type="text"
          placeholder="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          required
          style={styles.input}
        />

        <textarea
          placeholder="Note Content"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          required
          style={{ ...styles.input, height: '120px', resize: 'none' }}
        />

        <input
          type="file"
          onChange={(e) => setNoteFile(e.target.files[0])}
          name="note_file"
          style={{ marginBottom: '20px', color: '#c9d1d9' }}
        />

        <button type="submit" style={styles.submitButton}>
          {editingNoteId ? 'Update Note' : 'Upload Note'}
        </button>
      </form>

      <h2 style={styles.heading}>Uploaded Notes</h2>

      {notes.length > 0 ? (
        <div style={styles.notesGrid}>
          {notes.map((note) => (
            <div key={note.note_id} style={styles.noteCard}>
              <h3 style={styles.noteTitle}>{note.note_title}</h3>
              <p style={styles.noteContent}>
                {note.note_content?.substring(0, 100)}...
              </p>
              {note.note_file && (
                <a
                  href={`http://localhost:5000/uploads/${note.note_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.viewFileLink}
                >
                  📄 View File
                </a>
              )}
              <p style={styles.timestamp}>
                Uploaded at: {new Date(note.created_at).toLocaleString()}
              </p>
              <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleEdit(note)} style={styles.editButton}>
  ✏️ Edit
</button>

                <button onClick={() => handleDelete(note.note_id)} style={styles.deleteButton}>
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: '#8b949e', marginTop: '20px' }}>No notes uploaded yet.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#0d1117',
    minHeight: '100vh',
    padding: '40px',
    color: '#c9d1d9',
  },
  form: {
    backgroundColor: '#161b22',
    padding: '30px',
    borderRadius: '20px',
    marginBottom: '40px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    color: '#58a6ff',
    marginBottom: '20px',
    textAlign: 'left',
    width: '100%',
  },
  input: {
    backgroundColor: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: '10px',
    padding: '12px 16px',
    marginBottom: '20px',
    color: '#c9d1d9',
    fontSize: '16px',
    outline: 'none',
  },
  submitButton: {
    backgroundColor: '#1f6feb',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  notesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'flex-start',
  },
  noteCard: {
    backgroundColor: '#161b22',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    width: '100%',
    maxWidth: '600px',
  },
  noteTitle: {
    color: '#58a6ff',
    marginBottom: '10px',
  },
  noteContent: {
    color: '#c9d1d9',
    marginBottom: '10px',
  },
  viewFileLink: {
    display: 'inline-block',
    marginBottom: '10px',
    color: '#1f6feb',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: '12px',
    color: '#8b949e',
  },
  editButton: {
    backgroundColor: '#238636',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    backgroundColor: '#da3633',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default CourseNotesPage;





