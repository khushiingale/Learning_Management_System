
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NoteForm = () => {
  const { courseId } = useParams();
  const [noteData, setNoteData] = useState({
    title: '',
    content: '',
    file: null,
  });

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/${courseId}/notes`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setNoteData({ ...noteData, file: files[0] });
    } else {
      setNoteData({ ...noteData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('note_title', noteData.title);
    formData.append('note_content', noteData.content);
    formData.append('course_id', courseId);
    formData.append('instructor_id', 3); // hardcoded instructor_id
    if (noteData.file) {
      formData.append('note_file', noteData.file);
    }

    try {
      await axios.post('http://localhost:5000/api/notes/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });      
      alert('Note saved successfully!');
      setNoteData({ title: '', content: '', file: null });
      fetchNotes(); // refresh
    } catch (error) {
      console.error('Error saving note:', error); // 👈 ADD THIS LINE
      if (error.response?.data) {
        console.error('Server error response:', error.response.data); // 👈 ADD THIS TOO
      }
      console.error('Error response:', error.response.data); // 👈 Needed!
      alert('Failed to save note');
    }  
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Note for Course ID: {courseId}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={noteData.title}
          onChange={handleChange}
          required
        />
        <br />
        <textarea
          name="content"
          placeholder="Content"
          value={noteData.content}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="file"
          name="file"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Save Note</button>
      </form>

      {/* Uploaded Notes */}
      <h3>Uploaded Notes</h3>
      {notes.length > 0 ? (
        notes.map((note) => (
          <div key={note.note_id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <h4>{note.note_title}</h4>
            <p>{note.note_content}</p>
            {note.note_file && (
              <a href={`http://localhost:5000/uploads/${note.note_file}`} target="_blank" rel="noopener noreferrer">
                View Attached File
              </a>
            )}
          </div>
        ))
      ) : (
        <p>No notes uploaded yet.</p>
      )}
    </div>
  );
};

export default NoteForm;

// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import axios from 'axios';

// function NoteForm() {
//   const { courseId } = useParams(); // Get courseId from URL
//   const [noteTitle, setNoteTitle] = useState('');
//   const [noteContent, setNoteContent] = useState('');
//   const [noteFile, setNoteFile] = useState(null);

//   const instructorId = 3; // 🛠 Hardcoded for now. Later you can fetch from logged-in user.

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('note_title', noteTitle);
//     formData.append('note_content', noteContent);
//     formData.append('note_file', noteFile);
//     formData.append('course_id', courseId);
//     formData.append('instructor_id', instructorId);

//     try {
//       await axios.post('http://localhost:5000/api/notes', formData); // <-- Adjust the API URL as needed
//       alert('Note saved successfully!');
//     } catch (error) {
//       console.error('Error saving note:', error);
//       alert('Failed to save note.');
//     }
//   };

//   return (
//     <div>
//       <h2>Add Note for Course ID: {courseId}</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <input
//           type="text"
//           placeholder="Title"
//           value={noteTitle}
//           onChange={(e) => setNoteTitle(e.target.value)}
//           required
//         /><br/>

//         <textarea
//           placeholder="Content"
//           value={noteContent}
//           onChange={(e) => setNoteContent(e.target.value)}
//           required
//         /><br/>

//         <input
//           type="file"
//           onChange={(e) => setNoteFile(e.target.files[0])}
//         /><br/>

//         <button type="submit">Save Note</button>
//       </form>
//     </div>
//   );
// }

// export default NoteForm;
