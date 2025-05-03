import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = ({ studentName = 'Student' }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    // Clear tokens if needed
    navigate('/login');
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Login', path: '/login' },
    { name: 'Signup', path: '/signup' },
    { name: 'About', path: '/about' },
    { name: 'Support', path: 'https://learnsetu.zapier.app', external: true },
    {
      name: 'Contact',
      path: 'https://docs.google.com/forms/d/e/1FAIpQLSer1M0MGge7RJ18oOZrCgss5Eht_Sw_9EB-3zUU4Ig8ThI6DA/viewform?usp=header',
      external: true,
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      {/* Sidebar */}
      <motion.div
        animate={{ width: collapsed ? 70 : 220 }}
        transition={{ duration: 0.3 }}
        style={{
          backgroundColor: '#0f111a',
          color: '#fff',
          padding: collapsed ? '20px 10px' : '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 12px rgba(0,0,0,0.5)',
        }}
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            color: '#1ebeff',
            fontSize: collapsed ? '18px' : '24px',
            marginBottom: '30px',
            whiteSpace: 'nowrap',
          }}
        >
          {collapsed ? 'LS' : 'LearnSetu'}
        </motion.h2>

        {links.map((link, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            style={{
              margin: '10px 0',
              fontSize: collapsed ? '14px' : '16px',
              padding: '10px',
              borderRadius: '8px',
              textAlign: collapsed ? 'center' : 'left',
              width: '100%',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#1e2233')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            {link.external ? (
              <a
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {collapsed ? link.name.charAt(0) : link.name}
              </a>
            ) : (
              <Link to={link.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                {collapsed ? link.name.charAt(0) : link.name}
              </Link>
            )}
          </motion.div>
        ))}

        <div style={{ marginTop: 'auto', width: '100%' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              backgroundColor: '#1ebeff',
              color: '#0f111a',
              border: 'none',
              padding: '10px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '12px',
            }}
          >
            {collapsed ? '>' : '< Collapse'}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              backgroundColor: '#ff5c5c',
              color: '#fff',
              border: 'none',
              padding: '10px',
              borderRadius: '6px',
              cursor: 'pointer',
              width: '100%',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {collapsed ? '⎋' : 'Logout'}
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.welcomeTitle}>Welcome, {studentName}! 🚀</h1>
          <p style={styles.subtitle}>(View Courses, Quizzes)</p>

          <div style={styles.buttonGroup}>
            <button
              onClick={() => navigate('/courses')}
              style={{ ...styles.button, backgroundColor: '#1ebeff' }}
            >
              📘 View Courses
            </button>
            <button
              onClick={() => navigate('/student/take-quiz')}
              style={{ ...styles.button, backgroundColor: '#b388ff' }}
            >
              🧠 Take Quizzes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0f111a',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
  },
  card: {
    backgroundColor: '#1a1d2b',
    padding: '60px 50px',
    borderRadius: '16px',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
    width: '100%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  welcomeTitle: {
    color: '#1ebeff',
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#a0a0a0',
    fontSize: '18px',
    marginBottom: '40px',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  button: {
    padding: '16px',
    borderRadius: '10px',
    border: 'none',
    color: '#0f111a',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.2s, background-color 0.3s',
  },
};

export default StudentDashboard;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const StudentDashboard = ({ studentName = 'Student' }) => {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h1 style={styles.welcomeTitle}>Welcome, {studentName}! 🚀</h1>
//         <p style={styles.subtitle}>(View Courses, Quizzes)</p>

//         <div style={styles.buttonGroup}>
//           <button onClick={() => navigate('/courses')} style={{ ...styles.button, backgroundColor: '#1ebeff' }}>
//             📘 View Courses
//           </button>
//           <button onClick={() => navigate('/student/take-quiz')} style={{ ...styles.button, backgroundColor: '#b388ff' }}>
//             🧠 Take Quizzes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: '#0f111a',
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: 'Segoe UI, sans-serif',
//     padding: '40px',
//   },
//   card: {
//     backgroundColor: '#1a1d2b',
//     padding: '60px 50px',  // Bigger padding
//     borderRadius: '16px',
//     boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
//     width: '100%',
//     maxWidth: '600px', // Make the card bigger
//     textAlign: 'center',
//   },
//   welcomeTitle: {
//     color: '#1ebeff',
//     fontSize: '48px', // Even bigger welcome text
//     fontWeight: 'bold',
//     marginBottom: '20px',
//   },
//   subtitle: {
//     color: '#a0a0a0',
//     fontSize: '18px',
//     marginBottom: '40px',
//   },
//   buttonGroup: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '20px',
//   },
//   button: {
//     padding: '16px',
//     borderRadius: '10px',
//     border: 'none',
//     color: '#0f111a',
//     fontSize: '18px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     transition: 'transform 0.2s, background-color 0.3s',
//   },
// };

// export default StudentDashboard;



