import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Ensure you import 'Routes'

import NoteList from './components/NoteList'; // Assuming you have a list component
import MainPage from './components/MainPage';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminDashboard from './components/AdminDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import StudentDashboard from './components/StudentDashboard';
import About from './components/About';
import CourseList from './components/CourseList';
import CourseForm from './components/CourseForm';
import Quizzes from './components/Quizzes';
import Progress from './components/ProgressPage';
import CoursePage from './components/CoursePage';
import TakeQuiz from './components/TakeQuiz';
import NoteForm from './components/NoteForm'; // 🛠 add this line!
import InstructorNotes from './components/InstructorNotes';
import CourseNotesPage from './components/CourseNotesPage';
import StudyPage from './components/StudyPage';
import InstructorNotesPage from './components/InstructorNotesPage'; // ✅ import करा
import InstructorProgressPage from './components/InstructorProgressPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainPage/>} /> {/* Directing first to the SignUp page */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/signup" element={<Signup />} /> {/* ✅ Add this route */}
      <Route path="/login" element={<Login />} /> {/* Login route */}
      <Route path="/about" element={<About/>} />
      <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/instructor" element={<InstructorDashboard />}/>
      <Route path="/instructor/courses" element={<CourseList />} />
      <Route path="/instructor/course/add" element={<CourseForm />} />
      <Route path="/instructor/course/:courseId/edit" element={<CourseForm />} />
      <Route path="/courses" element={<CoursePage />} />
      
      <Route path="/student/take-quiz" element={<TakeQuiz />} />
      <Route path="/notes" element={<NoteList />} />
      {/* <Route path="/instructor/course/:courseId/notes" element={<NoteForm />} /> */}

      <Route path="/instructor/:instructorId/notes" element={<InstructorNotes />} />
      <Route path="/instructor/course/:courseId/notes" element={<CourseNotesPage />} />
      <Route path="/instructor/notes" element={<InstructorNotesPage />} />
      <Route path="quizzes" element={<Quizzes />} />
      <Route path="/study/:courseId" element={<StudyPage />} />
      <Route path="/instructor/progress" element={<InstructorProgressPage />} />

    </Routes>
  </Router>
  );
}

export default App;
