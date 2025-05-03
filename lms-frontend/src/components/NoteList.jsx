import React, { useEffect, useState } from 'react';
import axios from '../api';
//import './NoteList.css'; // create a similar css if needed
import { useNavigate } from 'react-router-dom';

const NoteList = () => {
  const instructorId = 3; // temporary
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const res = await axios.get(`/instructor/note/view/${instructorId}`);
      setNotes(res.data.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id) => {
    await axios.delete(`/instructor/note/delete/${id}`);
    fetchNotes();
  };

  return (
    <div className="note-list-container">
      <h2>Your Notes</h2>
      <button onClick={() => navigate('/instructor/note/add')}>
        ➕ Add Note
      </button>
      <div className="notes-grid">
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          notes.map((n) => (
            <div className="note-card" key={n.note_id}>
              <h3>{n.note_title}</h3>
              <p>{n.note_content}</p>
              {n.note_file && (
                <a 
                  href={`http://localhost:5000/uploads/${n.note_file}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  📄 View File
                </a>
              )}
              <div className="card-buttons">
                <button onClick={() => deleteNote(n.note_id)}>❌ Delete</button>
                <button onClick={() => navigate(`/instructor/note/${n.note_id}/edit`)}>✏️ Edit</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;
