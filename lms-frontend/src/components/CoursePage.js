// // src/components/CoursePage.js
import React, { useEffect, useState } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/instructor/courses/all');
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleStudyClick = (courseId) => {
    navigate(`/study/${courseId}`);
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.pageTitle}>📚 Available Courses</h1>

      {loading ? (
        <p style={styles.loadingText}>Loading courses...</p>
      ) : courses.length > 0 ? (
        <div style={styles.courseGrid}>
          {courses.map((course) => (
            <div key={course.course_id} style={styles.courseCard}>
              <h2 style={styles.courseName}>{course.course_name}</h2>
              <p style={styles.courseDescription}>{course.course_description}</p>

              {course.course_image && (
                <img
                  src={`http://localhost:5000/uploads/${course.course_image}`}
                  alt={course.course_name}
                  style={styles.courseImage}
                />
              )}

              <div style={styles.buttonGroup}>
                <button 
                  onClick={() => handleStudyClick(course.course_id)}
                  style={{ ...styles.button, backgroundColor: '#1ebeff' }}
                >
                  Study  📖
                </button>

                <a
                  href="https://youtu.be/oOpdX35ZeK0?si=uliU0CxmgF_UPzt8"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button 
                    style={{ ...styles.button, backgroundColor: '#b388ff' }}
                  >
                     More...
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.loadingText}>No courses available.</p>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#0f111a',
    minHeight: '100vh',
    padding: '60px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  pageTitle: {
    fontSize: '48px',
    color: '#1ebeff',
    marginBottom: '50px',
    textAlign: 'center',
  },
  loadingText: {
    color: '#aaa',
    fontSize: '22px',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    width: '100%',
    maxWidth: '1200px',
  },
  courseCard: {
    backgroundColor: '#1a1d2b',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    height: 'auto', // allow card to shrink naturally
    transition: 'transform 0.3s',
},

  courseName: {
    color: '#fff',
    fontSize: '28px',
    marginBottom: '12px',
  },
  courseDescription: {
    color: '#aaa',
    fontSize: '18px',
    marginBottom: '20px',
  },
  courseImage: {
    width: '100%',
    height: '180px', // fixed smaller height
    borderRadius: '12px',
    marginBottom: '15px',
    objectFit: 'cover',
},

buttonGroup: {
  display: 'flex',
  gap: '10px',
  marginTop: '15px',
},

  button: {
    padding: '12px 20px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0f111a',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};

export default CoursePage;


















// import React, { useEffect, useState } from 'react';
// import axios from '../api';
// import { useNavigate } from 'react-router-dom'; // ✅ Import for navigation
// import './CoursePage.css'; // or your relevant CSS file

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate(); // ✅

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('/instructor/courses/all');
//         setCourses(response.data.courses || []);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleStudyClick = (courseId) => {
//     navigate(`/study/${courseId}`); // ✅ Go to Study Page
//   };

//   return (
//     <div className="courses-container">
//       <h2>All Courses</h2>
//       {loading ? (
//         <p>Loading courses...</p>
//       ) : courses.length > 0 ? (
//         <ul className="course-list">
//           {courses.map((course) => (
//             <li key={course.course_id} className="course-card">
//               <h3>{course.course_name}</h3>
//               <p>{course.course_description}</p>
//               {course.course_image && (
//                 <img
//                   src={`http://localhost:5000/uploads/${course.course_image}`}
//                   alt={course.course_name}
//                   className="course-image"
//                 />
//               )}

//               {/* ✅ Only Study button */}
//               <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
//   {/* Study Button (function call) */}
//   <button
//     onClick={() => handleStudyClick(course.course_id)}
//     style={{ padding: '8px 16px', cursor: 'pointer' }}
//   >
//     Study
//   </button>

//   {/* More Button (external link) */}
//   <a 
//     href="https://youtu.be/oOpdX35ZeK0?si=uliU0CxmgF_UPzt8" 
//     target="_blank" 
//     rel="noopener noreferrer"
//     style={{ textDecoration: 'none' }}
//   >
//     <button
//       style={{ padding: '8px 16px', cursor: 'pointer' }}
//     >
//       More
//     </button>
//   </a>
// </div>


              

//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No courses available.</p>
//       )}
//     </div>
//   );
// };

// export default CoursePage;












// // src/components/CoursePage.js
// import React, { useEffect, useState } from 'react';
// import axios from '../api';
// import './CoursePage.css'; // or your relevant CSS file

// const CoursePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get('/instructor/courses/all');
//         setCourses(response.data.courses || []);
//       } catch (error) {
//         console.error('Error fetching courses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div className="courses-container">
//       <h2>All Courses</h2>
//       {loading ? (
//         <p>Loading courses...</p>
//       ) : courses.length > 0 ? (
//         <ul className="course-list">
//           {courses.map((course) => (
//             <li key={course.course_id} className="course-card">
//               <h3>{course.course_name}</h3>
//               <p>{course.course_description}</p>
//               {course.course_image && (
//                 <img
//                   src={`http://localhost:5000/uploads/${course.course_image}`}
//                   alt={course.course_name}
//                   className="course-image"
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No courses available.</p>
//       )}
//     </div>
//   );
// };

// export default CoursePage;
