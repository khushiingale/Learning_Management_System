// import React, { useState, useEffect } from "react";
// import jsPDF from "jspdf";
// import axios from "axios";

// const QuizApp = () => {
//   const [name, setName] = useState("");
//   const [started, setStarted] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);

//   const questions = [
//     {
//       question: "What does HTML stand for?",
//       options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
//       answer: "Hyper Text Markup Language"
//     },
//     {
//       question: "What is the correct syntax for referring to an external script called 'app.js'?",
//       options: ["<script href='app.js'>", "<script src='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"],
//       answer: "<script src='app.js'>"
//     },
//     {
//       question: "Which CSS property controls the text size?",
//       options: ["font-style", "text-size", "font-size", "text-style"],
//       answer: "font-size"
//     },
//     {
//       question: "Which company developed React.js?",
//       options: ["Google", "Facebook", "Twitter", "Microsoft"],
//       answer: "Facebook"
//     },
//     {
//       question: "Which database is NoSQL?",
//       options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
//       answer: "MongoDB"
//     },
//     {
//       question: "Which command is used to initialize a Node.js project?",
//       options: ["node init", "npm init", "node start", "npm start"],
//       answer: "npm init"
//     },
//     {
//       question: "What does API stand for?",
//       options: ["Application Programming Interface", "Application Program Interface", "Applied Programming Internet", "Application Process Interface"],
//       answer: "Application Programming Interface"
//     },
//     {
//       question: "Which hook is used to manage state in React?",
//       options: ["useRef", "useEffect", "useState", "useContext"],
//       answer: "useState"
//     },
//     {
//       question: "In MongoDB, data is stored in?",
//       options: ["Tables", "Collections", "Rows", "Columns"],
//       answer: "Collections"
//     },
//     {
//       question: "Which of the following is a backend framework?",
//       options: ["React", "Angular", "Vue", "Express"],
//       answer: "Express"
//     },
//     {
//       question: "Which HTML attribute is used to define inline styles?",
//       options: ["font", "class", "styles", "style"],
//       answer: "style"
//     },
//     {
//       question: "Which CSS property is used for background color?",
//       options: ["bgcolor", "color", "background-color", "bg-color"],
//       answer: "background-color"
//     },
//     {
//       question: "What is JSX?",
//       options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON Syntax Extension"],
//       answer: "JavaScript XML"
//     },
//     {
//       question: "Which command installs React?",
//       options: ["npm install react", "npm react install", "install react", "node install react"],
//       answer: "npm install react"
//     },
//     {
//       question: "Which port is default for React app?",
//       options: ["3000", "8000", "5000", "8080"],
//       answer: "3000"
//     },
//     {
//       question: "Which method is used to fetch API data?",
//       options: ["getData()", "fetch()", "retrieve()", "axiosData()"],
//       answer: "fetch()"
//     },
//     {
//       question: "Which one is a JavaScript package manager?",
//       options: ["npm", "Node", "TypeScript", "React"],
//       answer: "npm"
//     },
//     {
//       question: "Which is a version control system?",
//       options: ["Git", "Node.js", "npm", "React"],
//       answer: "Git"
//     },
//     {
//       question: "Who maintains Node.js?",
//       options: ["Google", "Microsoft", "OpenJS Foundation", "Amazon"],
//       answer: "OpenJS Foundation"
//     },
//     {
//       question: "Which lifecycle method runs after the component output has been rendered to the DOM?",
//       options: ["componentDidUpdate", "componentDidMount", "shouldComponentUpdate", "render"],
//       answer: "componentDidMount"
//     }
//   ];

//   const handleAnswer = (option) => {
//     if (option === questions[currentQuestion].answer) {
//       setScore(score + 1);
//     }
//     const nextQuestion = currentQuestion + 1;
//     if (nextQuestion < questions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const startQuiz = () => {
//     if (!name.trim()) {
//       alert("Please enter your name to start the quiz.");
//       return;
//     }
//     setStarted(true);
//   };

//   // useEffect(() => {
//   //   if (showResult) {
//   //     const submitProgress = async () => {
//   //       try {
//   //        // const studentId = localStorage.getItem("studentId") || 15;
//   //        const studentId = parseInt(localStorage.getItem("studentId") || "15", 10);

//   //         const quizId = 1;
//   //         const totalQuestions = questions.length;
//   //         const correctAnswers = score;
//   //         const wrongAnswers = totalQuestions - score;

//   //         await axios.post("http://localhost:5000/api/progress", {
//   //           user_id: parseInt(studentId),
//   //           quiz_id: quizId,
//   //           total_questions: totalQuestions,
//   //           correct_answers: correctAnswers,
//   //           wrong_answers: wrongAnswers,
//   //           score: score
//   //         });

//   //         console.log("Progress submitted!");
//   //       } catch (error) {
//   //         console.error("Error submitting progress:", error);
//   //       }
//   //     };

//   //     submitProgress();
//   //   }
//   // }, [showResult]);

//   useEffect(() => {
//     if (showResult) {
//       const submitProgress = async () => {
//         try {
//           const userId = parseInt(localStorage.getItem("studentId") || "15", 10);
//           const quizId = 1;
//           const totalQuestions = questions.length;
//           const correctAnswers = score;
//           const wrongAnswers = totalQuestions - score;
  
//           await axios.post("http://localhost:5000/api/progress", {
//             user_id: userId,
//             quiz_id: quizId,
//             total_questions: totalQuestions,
//             correct_answers: correctAnswers,
//             wrong_answers: wrongAnswers,
//             score: score
//           });
  
//           console.log("✅ Progress submitted!");
//         } catch (error) {
//           console.error("❌ Error submitting progress:", error);
//         }
//       };
  
//       submitProgress();
//     }
//   }, [showResult]);
  

//   const downloadCertificate = () => {
//     if (score <= 10) {
//       alert("Sorry, you need a minimum of 11 marks to get a certificate.");
//       return;
//     }

//     const doc = new jsPDF('landscape', 'pt', 'a4');

//     doc.setFillColor(10, 10, 35);
//     doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

//     doc.setDrawColor(0, 191, 255);
//     doc.setLineWidth(8);
//     doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 40);

//     doc.setFontSize(36);
//     doc.setTextColor(0, 191, 255);
//     doc.setFont('helvetica', 'bold');
//     doc.text("Certificate of Achievement", doc.internal.pageSize.getWidth() / 2, 130, { align: 'center' });

//     doc.setFontSize(22);
//     doc.setTextColor(255, 255, 255);
//     doc.text("This is proudly awarded to", doc.internal.pageSize.getWidth() / 2, 180, { align: 'center' });

//     doc.setFontSize(30);
//     doc.setFont('times', 'bolditalic');
//     doc.setTextColor(0, 255, 255);
//     doc.text(name, doc.internal.pageSize.getWidth() / 2, 230, { align: 'center' });

//     doc.setFontSize(18);
//     doc.setFont('courier', 'normal');
//     doc.setTextColor(200, 200, 255);
//     doc.text("For successfully completing Full Stack Development Quiz", doc.internal.pageSize.getWidth() / 2, 280, { align: 'center' });

//     doc.setFontSize(16);
//     doc.text(`Score: ${score}/20`, doc.internal.pageSize.getWidth() / 2, 320, { align: 'center' });

//     const today = new Date().toLocaleDateString();
//     doc.setFontSize(14);
//     doc.setTextColor(180, 180, 255);
//     doc.text(`Date: ${today}`, 80, 400);

//     doc.setFontSize(12);
//     doc.setTextColor(0, 191, 255);
//     doc.text("LearnSetu Director", doc.internal.pageSize.getWidth() - 130, 430, { align: 'center' });

//     doc.save("LearnSetu_Certificate.pdf");
//   };

//   return (
//     <div style={{ backgroundColor: "#0a0a23", color: "#00d9ff", minHeight: "100vh", padding: "20px" }}>
//       {!started ? (
//         <div style={{ textAlign: "center" }}>
//           <h1>Welcome to LearnSetu Full Stack Quiz</h1>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             style={{ padding: "10px", fontSize: "16px", margin: "10px" }}
//           />
//           <br />
//           <button onClick={startQuiz} style={{ padding: "10px 20px", fontSize: "18px" }}>
//             Start Quiz
//           </button>
//         </div>
//       ) : !showResult && questions[currentQuestion] ? (
//         <div style={{ textAlign: "center" }}>
//           <h2>Question {currentQuestion + 1}/{questions.length}</h2>
//           <h3>{questions[currentQuestion].question}</h3>
//           {questions[currentQuestion].options.map((option, idx) => (
//             <button
//               key={idx}
//               onClick={() => handleAnswer(option)}
//               style={{ display: "block", margin: "10px auto", padding: "10px 20px", fontSize: "16px" }}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//       ) : (
//         <div style={{ textAlign: "center" }}>
//           <h2>Quiz Completed!</h2>
//           <h3>Your Score: {score} / {questions.length}</h3>
//           {score > 10 && (
//             <button onClick={downloadCertificate} style={{ padding: "10px 20px", fontSize: "18px", marginTop: "20px" }}>
//               Download Certificate
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizApp;


import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import axios from "axios";

const QuizApp = () => {
  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { question: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"], answer: "Hyper Text Markup Language" },
    { question: "What is the correct syntax for referring to an external script called 'app.js'?", options: ["<script href='app.js'>", "<script src='app.js'>", "<script ref='app.js'>", "<script name='app.js'>"], answer: "<script src='app.js'>" },
    { question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: "font-size" },
    { question: "Which company developed React.js?", options: ["Google", "Facebook", "Twitter", "Microsoft"], answer: "Facebook" },
    { question: "Which database is NoSQL?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: "MongoDB" },
    { question: "Which command is used to initialize a Node.js project?", options: ["node init", "npm init", "node start", "npm start"], answer: "npm init" },
    { question: "What does API stand for?", options: ["Application Programming Interface", "Application Program Interface", "Applied Programming Internet", "Application Process Interface"], answer: "Application Programming Interface" },
    { question: "Which hook is used to manage state in React?", options: ["useRef", "useEffect", "useState", "useContext"], answer: "useState" },
    { question: "In MongoDB, data is stored in?", options: ["Tables", "Collections", "Rows", "Columns"], answer: "Collections" },
    { question: "Which of the following is a backend framework?", options: ["React", "Angular", "Vue", "Express"], answer: "Express" },
    { question: "Which HTML attribute is used to define inline styles?", options: ["font", "class", "styles", "style"], answer: "style" },
    { question: "Which CSS property is used for background color?", options: ["bgcolor", "color", "background-color", "bg-color"], answer: "background-color" },
    { question: "What is JSX?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON Syntax Extension"], answer: "JavaScript XML" },
    { question: "Which command installs React?", options: ["npm install react", "npm react install", "install react", "node install react"], answer: "npm install react" },
    { question: "Which port is default for React app?", options: ["3000", "8000", "5000", "8080"], answer: "3000" },
    { question: "Which method is used to fetch API data?", options: ["getData()", "fetch()", "retrieve()", "axiosData()"], answer: "fetch()" },
    { question: "Which one is a JavaScript package manager?", options: ["npm", "Node", "TypeScript", "React"], answer: "npm" },
    { question: "Which is a version control system?", options: ["Git", "Node.js", "npm", "React"], answer: "Git" },
    { question: "Who maintains Node.js?", options: ["Google", "Microsoft", "OpenJS Foundation", "Amazon"], answer: "OpenJS Foundation" },
    { question: "Which lifecycle method runs after the component output has been rendered to the DOM?", options: ["componentDidUpdate", "componentDidMount", "shouldComponentUpdate", "render"], answer: "componentDidMount" }
  ];

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const startQuiz = () => {
    if (!name.trim()) {
      alert("Please enter your name to start the quiz.");
      return;
    }

    // ✅ Set studentId before starting quiz
    localStorage.setItem("studentId", "15"); // Replace 15 with dynamic ID from login, if available

    setStarted(true);
  };

  useEffect(() => {
    if (showResult) {
      const submitProgress = async () => {
        try {
        //  const userId = parseInt(localStorage.getItem("studentId") || "16", 10);
        const userId = 10;

          const quizId = 1;
          const totalQuestions = questions.length;
          const correctAnswers = score;
          const wrongAnswers = totalQuestions - score;

          await axios.post("http://localhost:5000/api/progress", {
            user_id: userId,
            quiz_id: quizId,
            total_questions: totalQuestions,
            correct_answers: correctAnswers,
            wrong_answers: wrongAnswers,
            score: score
          });

          console.log("✅ Progress submitted!");
        } catch (error) {
          console.error("❌ Error submitting progress:", error);
        }
      };

      submitProgress();
    }
  }, [showResult]);

  const downloadCertificate = () => {
    if (score <= 10) {
      alert("Sorry, you need a minimum of 11 marks to get a certificate.");
      return;
    }

    const doc = new jsPDF('landscape', 'pt', 'a4');

    doc.setFillColor(10, 10, 35);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), 'F');

    doc.setDrawColor(0, 191, 255);
    doc.setLineWidth(8);
    doc.rect(20, 20, doc.internal.pageSize.getWidth() - 40, doc.internal.pageSize.getHeight() - 40);

    doc.setFontSize(36);
    doc.setTextColor(0, 191, 255);
    doc.setFont('helvetica', 'bold');
    doc.text("Certificate of Achievement", doc.internal.pageSize.getWidth() / 2, 130, { align: 'center' });

    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("This is proudly awarded to", doc.internal.pageSize.getWidth() / 2, 180, { align: 'center' });

    doc.setFontSize(30);
    doc.setFont('times', 'bolditalic');
    doc.setTextColor(0, 255, 255);
    doc.text(name, doc.internal.pageSize.getWidth() / 2, 230, { align: 'center' });

    doc.setFontSize(18);
    doc.setFont('courier', 'normal');
    doc.setTextColor(200, 200, 255);
    doc.text("For successfully completing Full Stack Development Quiz", doc.internal.pageSize.getWidth() / 2, 280, { align: 'center' });

    doc.setFontSize(16);
    doc.text(`Score: ${score}/20`, doc.internal.pageSize.getWidth() / 2, 320, { align: 'center' });

    const today = new Date().toLocaleDateString();
    doc.setFontSize(14);
    doc.setTextColor(180, 180, 255);
    doc.text(`Date: ${today}`, 80, 400);

    doc.setFontSize(12);
    doc.setTextColor(0, 191, 255);
    doc.text("LearnSetu Director", doc.internal.pageSize.getWidth() - 130, 430, { align: 'center' });

    doc.save("LearnSetu_Certificate.pdf");
  };

  return (
    <div style={{ backgroundColor: "#0a0a23", color: "#00d9ff", minHeight: "100vh", padding: "20px" }}>
      {!started ? (
        <div style={{ textAlign: "center" }}>
          <h1>Welcome to LearnSetu Full Stack Quiz</h1>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "10px", fontSize: "16px", margin: "10px" }}
          />
          <br />
          <button onClick={startQuiz} style={{ padding: "10px 20px", fontSize: "18px" }}>
            Start Quiz
          </button>
        </div>
      ) : !showResult && questions[currentQuestion] ? (
        <div style={{ textAlign: "center" }}>
          <h2>Question {currentQuestion + 1}/{questions.length}</h2>
          <h3>{questions[currentQuestion].question}</h3>
          {questions[currentQuestion].options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              style={{ display: "block", margin: "10px auto", padding: "10px 20px", fontSize: "16px" }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>Quiz Completed!</h2>
          <h3>Your Score: {score} / {questions.length}</h3>
          {score > 10 && (
            <button onClick={downloadCertificate} style={{ padding: "10px 20px", fontSize: "18px", marginTop: "20px" }}>
              Download Certificate
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
