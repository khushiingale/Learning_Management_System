// import React, { useEffect, useState } from 'react';
// import axios from '../api';
// import './CourseList.css';
// import { useNavigate } from 'react-router-dom';

// const CourseList = () => {
//   const instructorId = 3; // temporary
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();

//   const fetchCourses = async () => {
//     try {
//       const res = await axios.get(`/instructor/course/view/${instructorId}`);
//       setCourses(res.data.courses || []);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const deleteCourse = async (id) => {
//     await axios.delete(`/instructor/course/delete/${id}`);
//     fetchCourses();
//   };

//   return (
//     <div className="course-list-container">
//       <h2>Your Courses</h2>
//       <button onClick={() => navigate('/instructor/course/add')}>
//         ➕ Add Course
//       </button>
//       <div className="courses-grid">
//         {courses.length === 0 ? (
//           <p>No courses found.</p>
//         ) : (
//           courses.map((c) => (
//             <div className="course-card" key={c.course_id}>
//               <img
//                   src={`http://localhost:5000/uploads/${c.course_image}`}
//                   alt={c.course_name}
//                   width="150"
//                 />
//               <h3>{c.course_name}</h3>
//               <p>{c.course_description}</p>
//               <div className="card-buttons">
//                 <button onClick={() => deleteCourse(c.course_id)}>❌ Delete</button>
//                 <button onClick={() => navigate(`/instructor/course/${c.course_id}/edit`)}>✏️ Edit</button>
//                 <button onClick={() => navigate(`/instructor/course/${c.course_id}/notes`)}>Notes</button>


//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CourseList;

import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {
  const instructorId = 3; // temporary
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`/instructor/course/view/${instructorId}`);
      setCourses(res.data.courses || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    await axios.delete(`/instructor/course/delete/${id}`);
    fetchCourses();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Courses</h2>
      <button style={styles.addButton} onClick={() => navigate('/instructor/course/add')}>
        ➕ Add Course
      </button>

      <div style={styles.grid}>
        {courses.length === 0 ? (
          <p style={{ color: '#ccc' }}>No courses found.</p>
        ) : (
          courses.map((c) => (
            <div key={c.course_id} style={styles.card}>
              {c.course_image && (
                <img
                  src={`http://localhost:5000/uploads/${c.course_image}`}
                  alt={c.course_name}
                  style={styles.image}
                />
              )}
              <h3 style={styles.courseTitle}>{c.course_name}</h3>
              <p style={styles.courseDescription}>{c.course_description}</p>

              <div style={styles.cardButtons}>
                <button 
                  style={{ ...styles.actionButton, backgroundColor: '#ff4d4f' }} // RED for Delete
                  onClick={() => deleteCourse(c.course_id)}
                >
                  ❌ Delete
                </button>
                <button 
                  style={{ ...styles.actionButton, backgroundColor: '#1f6feb' }} // BLUE for Edit
                  onClick={() => navigate(`/instructor/course/${c.course_id}/edit`)}
                >
                  ✏️ Edit
                </button>
                <button 
                  style={{ ...styles.actionButton, backgroundColor: '#238636' }} // GREEN for Notes
                  onClick={() => navigate(`/instructor/course/${c.course_id}/notes`)}
                >
                  📒 Notes
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0d1117',
    minHeight: '100vh',
    padding: '40px',
    color: '#fff',
  },
  heading: {
    fontSize: '32px',
    color: '#58a6ff',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#1f6feb',
    color: '#fff',
    padding: '12px 24px',
    fontSize: '16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '30px',
    transition: 'background-color 0.3s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#161b22',
    padding: '20px',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
    transition: 'transform 0.3s',
  },
  image: {
    width: '100%',
    height: '250px',         // taller image container
    objectFit: 'contain',    // show full image without cutting
    borderRadius: '15px',
    marginBottom: '20px',
    backgroundColor: '#0d1117', // blend with card background if image is transparent
  },
  
  courseTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#79c0ff',
  },
  courseDescription: {
    fontSize: '14px',
    color: '#c9d1d9',
    marginBottom: '20px',
  },
  cardButtons: {
    display: 'flex',           // <-- Horizontal flex
    justifyContent: 'center',  // <-- Center horizontally
    gap: '10px',               // <-- Space between buttons
    marginTop: '15px',
  },
  actionButton: {
    color: '#fff',
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
};

export default CourseList;

