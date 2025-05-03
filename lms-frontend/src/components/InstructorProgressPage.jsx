import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
} from "recharts";

const InstructorProgressPage = () => {
  const [progressData, setProgressData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [quizFilter, setQuizFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/progress/all")
  //     .then((response) => {
  //       setProgressData(response.data);
  //       setFilteredData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching progress data:", error);
  //     });
  // }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/progress/all")
      .then(response => {
        const cleanedData = response.data.map(entry => ({
          ...entry,
          total_correct: Number(entry.total_correct),
          total_wrong: Number(entry.total_wrong),
          avg_score: Number(entry.avg_score),
          attempts: Number(entry.attempts),
        }));
        setProgressData(cleanedData);
        setFilteredData(cleanedData);
      })
      .catch(error => {
        console.error("Error fetching progress data:", error);
      });
  }, []);
  

  useEffect(() => {
    const filtered = progressData.filter(entry =>
      (quizFilter === "" || entry.quiz_id.toString() === quizFilter) &&
      (usernameFilter === "" || entry.username.toLowerCase().includes(usernameFilter.toLowerCase()))
    );
    setFilteredData(filtered);
  }, [quizFilter, usernameFilter, progressData]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📊 Quiz Progress Overview</h2>

        {/* Filters */}
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Filter by Username"
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Filter by Quiz ID"
            value={quizFilter}
            onChange={(e) => setQuizFilter(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Chart */}
        <div style={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={filteredData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
            >
              <CartesianGrid stroke="#2e2e40" />
              <XAxis type="number" stroke="#ccc" />
              <YAxis dataKey="username" type="category" stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: '#1a1d2b', border: 'none', color: '#fff' }} />
              <Legend />
              <Bar dataKey="avg_score" fill="#1ebeff" name="Avg. Score" />
              <Bar dataKey="attempts" fill="#10B981" name="Attempts" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table */}
        <h3 style={styles.subHeading}>📋 Filtered Data</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Username</th>
                <th style={styles.th}>Quiz ID</th>
                <th style={styles.th}>Attempts</th>
                <th style={styles.th}>Correct</th>
                <th style={styles.th}>Wrong</th>
                <th style={styles.th}>Avg Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={index} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                  <td style={styles.td}>{entry.username}</td>
                  <td style={styles.td}>{entry.quiz_id}</td>
                  <td style={styles.td}>{entry.attempts}</td>
                  <td style={styles.td}>{entry.total_correct}</td>
                  <td style={styles.td}>{entry.total_wrong}</td>
                  <td style={styles.td}>{Number(entry.avg_score).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0f111a',
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#f0f0f0',
  },
  card: {
    backgroundColor: '#1a1d2b',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
  },
  heading: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1ebeff',
    textAlign: 'center',
    marginBottom: '30px',
  },
  subHeading: {
    fontSize: '20px',
    fontWeight: '600',
    marginTop: '40px',
    marginBottom: '15px',
    color: '#1ebeff',
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #2e2e40',
    backgroundColor: '#272a3a',
    color: '#f0f0f0',
    fontSize: '14px',
    outline: 'none',
    minWidth: '220px',
  },
  chartContainer: {
    backgroundColor: '#272a3a',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#1a1d2b',
    border: '1px solid #2e2e40',
  },
  th: {
    padding: '12px',
    backgroundColor: '#1ebeff22',
    color: '#1ebeff',
    fontWeight: 'bold',
    borderBottom: '1px solid #2e2e40',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #2e2e40',
    color: '#f0f0f0',
  },
  rowEven: {
    backgroundColor: '#1a1d2b',
  },
  rowOdd: {
    backgroundColor: '#1a1d2b88',
  },
};

export default InstructorProgressPage;







// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
// } from "recharts";

// const InstructorProgressPage = () => {
//   const [progressData, setProgressData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [quizFilter, setQuizFilter] = useState("");
//   const [usernameFilter, setUsernameFilter] = useState("");

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/progress/all")
//       .then((response) => {
//         setProgressData(response.data);
//         setFilteredData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching progress data:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const filtered = progressData.filter(entry =>
//       (quizFilter === "" || entry.quiz_id.toString() === quizFilter) &&
//       (usernameFilter === "" || entry.username.toLowerCase().includes(usernameFilter.toLowerCase()))
//     );
//     setFilteredData(filtered);
//   }, [quizFilter, usernameFilter, progressData]);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📊 Quiz Progress Overview</h2>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Filter by Username"
//             value={usernameFilter}
//             onChange={(e) => setUsernameFilter(e.target.value)}
//             className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//           />
//           <input
//             type="number"
//             placeholder="Filter by Quiz ID"
//             value={quizFilter}
//             onChange={(e) => setQuizFilter(e.target.value)}
//             className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//           />
//         </div>

//         {/* Chart */}
//         <div className="bg-gray-50 p-4 rounded-lg shadow-inner mb-10">
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart
//               data={filteredData}
//               layout="vertical"
//               margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis type="number" />
//               <YAxis dataKey="username" type="category" />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="avg_score" fill="#6366F1" name="Avg. Score" />
//               <Bar dataKey="attempts" fill="#10B981" name="Attempts" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Table */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4">📋 Filtered Data</h3>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//               <thead className="bg-indigo-100 text-gray-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Username</th>
//                   <th className="px-4 py-3 text-left">Quiz ID</th>
//                   <th className="px-4 py-3 text-left">Attempts</th>
//                   <th className="px-4 py-3 text-left">Correct</th>
//                   <th className="px-4 py-3 text-left">Wrong</th>
//                   <th className="px-4 py-3 text-left">Avg Score</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((entry, index) => (
//                   <tr key={index} className="border-t hover:bg-gray-50 transition">
//                     <td className="px-4 py-3">{entry.username}</td>
//                     <td className="px-4 py-3">{entry.quiz_id}</td>
//                     <td className="px-4 py-3">{entry.attempts}</td>
//                     <td className="px-4 py-3">{entry.total_correct}</td>
//                     <td className="px-4 py-3">{entry.total_wrong}</td>
//                     <td className="px-4 py-3">{Number(entry.avg_score).toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorProgressPage;
