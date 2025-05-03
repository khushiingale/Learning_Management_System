import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api';

const StudyPage = () => {
  const { courseId } = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`/api/notes/courses/${courseId}/notes`);
        setNotes(response.data.notes || []);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [courseId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📘 Study Notes for Course {courseId}</h2>

      {loading ? (
        <p style={styles.text}>Loading notes...</p>
      ) : notes.length > 0 ? (
        <div style={styles.notesGrid}>
          {notes.map((note) => (
            <div key={note.note_id} style={styles.noteCard}>
              <h3 style={styles.noteTitle}>{note.note_title}</h3>
              <p style={styles.noteContent}>
                {note.note_content.substring(0, 150)}...
              </p>
              {note.note_file && (
                <a
                  href={`http://localhost:5000/uploads/${note.note_file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.viewFileButton}
                >
                  📄 View Attached File
                </a>
              )}
              <p style={styles.timestamp}>
                Uploaded at: {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.text}>No notes available for this course.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0f111a',
    minHeight: '100vh',
    padding: '40px 20px',
    color: '#f0f0f0',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#1ebeff',
    fontSize: '28px',
    marginBottom: '30px',
  },
  text: {
    textAlign: 'center',
    color: '#ccc',
  },
  notesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  noteCard: {
    backgroundColor: '#1a1d2b',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
  },
  noteTitle: {
    color: '#1ebeff',
    fontSize: '20px',
    marginBottom: '10px',
  },
  noteContent: {
    color: '#ddd',
    fontSize: '14px',
    marginBottom: '15px',
  },
  viewFileButton: {
    display: 'inline-block',
    marginTop: '10px',
    backgroundColor: '#1ebeff',
    color: '#0f111a',
    padding: '10px 14px',
    borderRadius: '8px',
    fontWeight: 'bold',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  timestamp: {
    marginTop: '12px',
    fontSize: '12px',
    color: '#888',
  },
};

export default StudyPage;
