import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashboardCard = ({ title, value, icon, link }) => (
  <Link to={link} style={{ textDecoration: 'none' }}>
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 180, 255, 0.5)' }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'linear-gradient(145deg, #1e2a38, #0f111a)',
        color: '#ffffff',
        borderRadius: '20px',
        padding: '35px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '300px',
        minHeight: '160px',
        cursor: 'pointer',
        transition: '0.3s',
        margin: '15px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>{title}</h3>
        <p style={{ marginTop: '10px', fontSize: '1.5rem', fontWeight: '500', color: '#d1d1d1' }}>{value}</p>
      </div>
      <div style={{ fontSize: '3.5rem' }}>{icon}</div>
    </motion.div>
  </Link>
);

const InstructorDashboard = () => {
  const [courseCount, setCourseCount] = useState(9);
  const [progress, setProgress] = useState('%');
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const instructorId = localStorage.getItem('instructor_id');

    fetch(`/api/instructor/stats/${instructorId}`)
      .then(res => res.json())
      .then(data => {
        setCourseCount(data.courseCount || 8);
        setProgress(`${data.progress || 20}%`);
      })
      .catch(err => console.error('Failed to fetch instructor stats:', err));
  }, []);

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

  const handleLogout = () => {
    // Optional: localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Poppins, sans-serif' }}>
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
      <div style={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
        flex: 1,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <div style={{ fontSize: '4rem' }}>👩‍🏫</div>
          <h1 style={{
            fontSize: '3.2rem',
            color: '#ffffff',
            fontWeight: '800',
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
          }}>
            Welcome, Instructor!
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
            gap: '30px',
          }}
        >
          <DashboardCard title="Courses" value={courseCount} icon="📚" link="/instructor/courses" />
          <DashboardCard title="Progress" value={progress} icon="📈" link="/instructor/progress" />
        </motion.div>

        <div style={{ marginTop: '40px', width: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;



// import React, { useEffect, useState } from 'react';
// import { Outlet, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const DashboardCard = ({ title, value, icon, link }) => {
//   return (
//     <Link to={link} style={{ textDecoration: 'none' }}>
//       <motion.div
//         whileHover={{ scale: 1.05, boxShadow: '0px 10px 30px rgba(0, 180, 255, 0.5)' }}
//         whileTap={{ scale: 0.98 }}
//         style={{
//           background: 'linear-gradient(145deg, #1e2a38, #0f111a)',
//           color: '#ffffff',
//           borderRadius: '20px',
//           padding: '35px',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           minWidth: '300px',
//           minHeight: '160px',
//           cursor: 'pointer',
//           transition: '0.3s',
//           margin: '15px',
//           boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
//         }}
//       >
//         <div>
//           <h3 style={{ margin: 0, fontSize: '2rem', fontWeight: '700' }}>{title}</h3>
//           <p style={{ marginTop: '10px', fontSize: '1.5rem', fontWeight: '500', color: '#d1d1d1' }}>{value}</p>
//         </div>
//         <div style={{ fontSize: '3.5rem' }}>{icon}</div>
//       </motion.div>
//     </Link>
//   );
// };

// const InstructorDashboard = () => {
//   const [courseCount, setCourseCount] = useState(9);
//   const [quizCount, setQuizCount] = useState(0);
//   const [progress, setProgress] = useState('%');

//   useEffect(() => {
//     const instructorId = localStorage.getItem('instructor_id');

//     fetch(`/api/instructor/stats/${instructorId}`)
//       .then(res => res.json())
//       .then(data => {
//         setCourseCount(data.courseCount || 8);
//         // setQuizCount(data.quizCount || 0);
//         setProgress(`${data.progress || 20}%`);
//       })
//       .catch(err => console.error('Failed to fetch instructor stats:', err));
//   }, []);

//   return (
//     <div style={{
//       fontFamily: 'Poppins, sans-serif',
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
//       padding: '40px 20px',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     }}>
//       <motion.div
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         style={{ textAlign: 'center', marginBottom: '40px' }}
//       >
//         <div style={{ fontSize: '4rem' }}>👩‍🏫</div>
//         <h1 style={{
//           fontSize: '3.2rem',
//           color: '#ffffff',
//           fontWeight: '800',
//           textShadow: '2px 2px 8px rgba(0,0,0,0.5)'
//         }}>
//           Welcome, Instructor!
//         </h1>
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           justifyContent: 'center',
//           width: '100%',
//           maxWidth: '1200px',
//           gap: '30px',
//         }}
//       >
//         <DashboardCard title="Courses" value={courseCount} icon="📚" link="/instructor/courses" />
//         {/* <DashboardCard title="Quizzes" value={quizCount} icon="📝" link="/instructor/quizzes" /> */}
//         <DashboardCard title="Progress" value={progress} icon="📈" link="/instructor/progress" />
//       </motion.div>

//       <div style={{ marginTop: '40px', width: '100%' }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default InstructorDashboard;








