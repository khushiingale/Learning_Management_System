// components/Quizzes.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quizzes = ({ courseId }) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`/instructor/quiz/view/${courseId}`);
        setQuizzes(res.data.quizzes || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [courseId]);

  return (
    <div>
      <h3>Quizzes</h3>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.quiz_id}>
            <h4>{quiz.quiz_name}</h4>
            <p>{quiz.quiz_description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quizzes;
