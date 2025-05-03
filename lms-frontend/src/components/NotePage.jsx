import React, { useEffect, useState } from 'react';
import axios from '../api';
import './NotePage.css'; // similar css file if needed

const NotePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/instructor/notes/all');
        setNotes(response.data.notes || []);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="notes-container">
      <h2>All Notes</h2>
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length > 0 ? (
        <ul className="note-list">
          {notes.map((note) => (
            <li key={note.note_id} className="note-card">
              <h3>{note.note_title}</h3>
              <p>{note.note_content}</p>
              {note.note_file && (
                <a 
                  href={`http://localhost:5000/uploads/${note.note_file}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  📄 View Attached File
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default NotePage;
