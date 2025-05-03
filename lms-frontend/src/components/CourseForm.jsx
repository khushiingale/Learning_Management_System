import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const ContactForm = () => {
  const { courseId } = useParams();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const instructorId = 3;

  useEffect(() => {
    if (courseId) {
      axios.get(`/instructor/course/${courseId}`)
        .then((res) => {
          const course = res.data.course;
          if (course) {
            setName(course.course_name);
            setDesc(course.course_description);
          } else {
            console.error('Course not found');
          }
        })
        .catch(error => {
          console.error('Error fetching course:', error);
        });
    }
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('course_name', name);
    formData.append('course_description', desc);
    formData.append('instructor_id', instructorId);
    if (image) formData.append('image', image);

    try {
      if (courseId) {
        await axios.put(`/instructor/course/update/${courseId}`, formData);
      } else {
        await axios.post('/instructor/course/add', formData);
      }
      navigate('/instructor/courses');
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styles.form}>
        <h2 style={styles.heading}>{courseId ? 'Edit Course' : 'Add Course'}</h2>

        <input
          type="text"
          placeholder="Course Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.fileInput}
        />

        <button type="submit" style={styles.submitButton}>
          {courseId ? 'Update Course' : 'Add Course'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0d1117',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  form: {
    backgroundColor: '#161b22',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '500px',
  },
  heading: {
    fontSize: '28px',
    color: '#58a6ff',
    marginBottom: '30px',
    textAlign: 'center',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #30363d',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    fontSize: '16px',
    marginBottom: '20px',
    outline: 'none',
  },
  fileInput: {
    padding: '12px 16px',
    borderRadius: '10px',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    fontSize: '16px',
    border: '1px solid #30363d',
    marginBottom: '30px',
    outline: 'none',
  },
  submitButton: {
    backgroundColor: '#1f6feb',
    color: '#fff',
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default ContactForm;
