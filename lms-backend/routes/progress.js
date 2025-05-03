// const express = require("express");
// const router = express.Router();
// const db = require("../models/db"); // your db connection

// // GET all quiz progress for instructor dashboard
// router.get("/all", async (req, res) => {
//   const sql = `
//     SELECT u.username, p.quiz_id, COUNT(*) AS attempts,
//            SUM(p.correct_answers) AS total_correct,
//            SUM(p.wrong_answers) AS total_wrong,
//            AVG(p.score) AS avg_score
//     FROM progress_tracking p
//     JOIN users u ON p.user_id = u.user_id
//     GROUP BY p.user_id, p.quiz_id;
//   `;
//   try {
//     const [results] = await db.query(sql);
//     res.json(results);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });


// router.post("/save", (req, res) => {
//   const { username, quiz_id, correct_answers, wrong_answers, score } = req.body;

//   const getUserSql = "SELECT id FROM users WHERE username = ?";
//   db.query(getUserSql, [username], (err, userResults) => {
//     if (err) return res.status(500).json(err);
//     if (userResults.length === 0) return res.status(404).json({ error: "User not found" });

//     const user_id = userResults[0].id;
//     const insertSql = `
//       INSERT INTO progress_tracking (user_id, quiz_id, correct_answers, wrong_answers, score)
//       VALUES (?, ?, ?, ?, ?)
//     `;
//     db.query(insertSql, [user_id, quiz_id, correct_answers, wrong_answers, score], (err, result) => {
//       if (err) return res.status(500).json(err);
//       res.status(200).json({ message: "Progress saved successfully!" });
//     });
//   });
// });



// router.post("/", (req, res) => {
//   const {
//     studentId,
//     quizId,
//     totalQuestions,
//     correctAnswers,
//     wrongAnswers,
//     score,
//   } = req.body;

//   const sql = `
//     INSERT INTO progress_tracking 
//     (user_id, quiz_id, total_questions, correct_answers, wrong_answers, score) 
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   db.query(
//     sql,
//     [studentId, quizId, totalQuestions, correctAnswers, wrongAnswers, score],
//     (err, result) => {
//       if (err) {
//         console.error("❌ Error inserting progress:", err);
//         return res.status(500).send("Error saving progress");
//       }
//       console.log("✅ Progress saved to DB");
//       res.send("Progress saved successfully");
//     }
//   );
// });


// module.exports = router;


const express = require("express");
const router = express.Router();
const db = require("../models/db"); // your db connection

// Route: Submit quiz progress
router.post("/", (req, res) => {
  const {
    user_id,
    quiz_id,
    total_questions,
    correct_answers,
    wrong_answers,
    score,
  } = req.body;

  const sql = `
    INSERT INTO progress_tracking 
    (user_id, quiz_id, total_questions, correct_answers, wrong_answers, score) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user_id, quiz_id, total_questions, correct_answers, wrong_answers, score],
    (err, result) => {
      if (err) {
        console.error("❌ Error inserting progress:", err);
        return res.status(500).send("Error saving progress");
      }
      console.log("✅ Progress saved to DB");
      res.send("Progress saved successfully");
    }
  );
});

// Route: For instructor dashboard
router.get("/all", async (req, res) => {
  const sql = `
    SELECT u.username, p.quiz_id, COUNT(*) AS attempts,
           SUM(p.correct_answers) AS total_correct,
           SUM(p.wrong_answers) AS total_wrong,
           AVG(p.score) AS avg_score
    FROM progress_tracking p
    JOIN users u ON p.user_id = u.user_id
    GROUP BY p.user_id, p.quiz_id;
  `;
  try {
    const [results] = await db.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
