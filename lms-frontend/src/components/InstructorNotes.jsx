import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InstructorNotes({ instructorId }) {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editData, setEditData] = useState({ note_title: '', note_content: '' });

  useEffect(() => {
    fetchNotes();
  }, [instructorId]);

  async function fetchNotes() {
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/instructor/${instructorId}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  async function deleteNote(noteId) {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`http://localhost:5000/api/delete/${noteId}`);
        fetchNotes(); // Refresh after delete
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  }

  function startEditing(note) {
    setEditingNoteId(note.note_id);
    setEditData({ note_title: note.note_title, note_content: note.note_content });
  }

  async function saveEdit(noteId) {
    try {
      await axios.put(`http://localhost:5000/api/update/${noteId}`, {
        title: editData.note_title,
        description: editData.note_content,
        youtubeLink: '', // if you don't use youtube_link, pass empty
      });
      setEditingNoteId(null);
      fetchNotes(); // Refresh after update
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }

  function cancelEdit() {
    setEditingNoteId(null);
  }

  return (
    <div>
      <h2>My Uploaded Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.note_id}>
            {editingNoteId === note.note_id ? (
              <div>
                <input
                  type="text"
                  value={editData.note_title}
                  onChange={e => setEditData({ ...editData, note_title: e.target.value })}
                />
                <textarea
                  value={editData.note_content}
                  onChange={e => setEditData({ ...editData, note_content: e.target.value })}
                ></textarea>
                <button onClick={() => saveEdit(note.note_id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{note.note_title}</h3>
                <p>{note.note_content}</p>
                {note.note_file && (
                  <a
                    href={`http://localhost:5000/uploads/${note.note_file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download File
                  </a>
                )}
                <br />
                <button onClick={() => startEditing(note)}>Edit ✏️</button>
                <button onClick={() => deleteNote(note.note_id)}>Delete 🗑️</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InstructorNotes;
