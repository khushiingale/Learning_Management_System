// components/AddQuiz.js
import React, { useState } from 'react';
import axios from 'axios';

const AddQuiz = ({ courseId }) => {
  const [quiz, setQuiz] = useState({ name: '', description: '' });

  const handleSubmit = async () => {
    try {
      await axios.post('/instructor/quiz/add', {
        course_id: courseId,
        quiz_name: quiz.name,
        quiz_description: quiz.description,
      });
      setQuiz({ name: '', description: '' });
      alert('Quiz added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding quiz');
    }
  };

  return (
    <div>
      <h3>Add Quiz</h3>
      <input
        placeholder="Quiz Name"
        value={quiz.name}
        onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
      />
      <textarea
        placeholder="Quiz Description or Link"
        value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
      />
      <button onClick={handleSubmit}>Add Quiz</button>
    </div>
  );
};

export default AddQuiz;
