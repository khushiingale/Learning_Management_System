import React, { useEffect, useState } from 'react';
import axios from 'axios';

function InstructorNotesPage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const instructorId = 3; // ✅ हे नंतर dynamic करू शकतो
      const response = await axios.get(`http://localhost:5000/api/instructor/${instructorId}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Uploaded Notes</h1>

      {notes.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {notes.map(note => (
            <div key={note.note_id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              <h3>{note.note_title}</h3>
              <p>{note.note_content.substring(0, 100)}...</p>
              {note.note_file && (
                <a href={`http://localhost:5000/uploads/${note.note_file}`} target="_blank" rel="noopener noreferrer">
                  📄 View File
                </a>
              )}
              <p style={{ fontSize: '12px', color: '#666' }}>Uploaded at: {new Date(note.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No notes uploaded yet.</p>
      )}
    </div>
  );
}

export default InstructorNotesPage;
