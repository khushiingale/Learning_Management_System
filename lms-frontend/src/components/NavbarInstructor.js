import React from 'react';
import { Link } from 'react-router-dom';

const NavbarInstructor = () => {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '10px', background: '#f0f0f0' }}>
      <Link to="/instructor/courses">Courses</Link>
      <Link to="/instructor/quizzes">Quizzes</Link>
      <Link to="/instructor/progress">Progress</Link>
    </nav>
  );
};

export default NavbarInstructor;
