import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from 'recharts';
import axios from 'axios';

const COLORS = ['#00BFFF', '#1E90FF', '#4169E1', '#6495ED']; // blue shades

export default function ProgressPage() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('/api/progress/1'); // replace 1 with dynamic userId
        setProgress(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgress();
  }, []);

  if (!progress) return <div className="text-white">Loading...</div>;

  const pieData = [
    { name: 'Correct', value: progress.total_correct },
    { name: 'Wrong', value: progress.total_wrong },
  ];

  const barData = [
    { name: 'Score', score: progress.total_score },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-900 p-10 text-white">
      <h1 className="text-4xl mb-10 text-center font-bold text-blue-400">Your Quiz Progress 📈</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-black/60 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-2xl mb-6 text-blue-300">Correct vs Wrong (Pie Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-black/60 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-2xl mb-6 text-blue-300">Total Score (Bar Chart)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#00BFFF" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
