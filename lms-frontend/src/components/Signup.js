import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AlertBox = ({ message, type, onClose }) => {
  if (!message) return null;

  const alertStyle = {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '14px 24px',
    borderRadius: '8px',
    backgroundColor: type === 'success' ? '#1ebeff' : '#ff4d4d',
    color: '#0f111a',
    fontWeight: 'bold',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
    zIndex: 999,
    fontSize: '16px',
    textAlign: 'center',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)',
    cursor: 'pointer',
  };

  return (
    <div style={alertStyle} onClick={onClose}>
      {message}
    </div>
  );
};

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
    setTimeout(() => setAlert({ message: '', type: '' }), 3000);
  };

  const validateUsername = (name) => /^[A-Za-z]+$/.test(name);
  const validateEmail = (email) => /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(email);
  const validatePassword = (pass) => pass.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      showAlert('Please fill all fields.', 'error');
      return;
    }

    if (!validateUsername(username)) {
      showAlert('Username must contain only letters.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showAlert('Enter a valid email address.', 'error');
      return;
    }

    if (!validatePassword(password)) {
      showAlert('Password must be at least 6 characters.', 'error');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email, role: 'student' }),
      });

      const data = await res.json();

      if (res.status === 201) {
        showAlert('Signup successful!', 'success');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        showAlert(data.message || 'Signup failed.', 'error');
      }
    } catch (error) {
      showAlert('Error connecting to server.', 'error');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <AlertBox message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />

      <div style={styles.card}>
        <h2 style={styles.heading}>Create Your Account 🚀</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Signup</button>
        </form>
        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#0f111a',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
  },
  card: {
    background: '#1a1d2b',
    padding: '40px 30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    color: '#1ebeff',
    fontSize: '26px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '12px 15px',
    margin: '10px 0',
    borderRadius: '8px',
    border: '1px solid #2e2e40',
    backgroundColor: '#272a3a',
    color: '#f0f0f0',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    backgroundColor: '#1ebeff',
    color: '#0f111a',
    padding: '12px',
    marginTop: '15px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  text: {
    marginTop: '20px',
    color: '#a0a0a0',
    fontSize: '14px',
  },
  link: {
    color: '#1ebeff',
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Signup;








// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';

// const AlertBox = ({ message, type, onClose }) => {
//   if (!message) return null;

//   const alertStyle = {
//     position: 'fixed',
//     top: '20px',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     padding: '14px 24px',
//     borderRadius: '8px',
//     backgroundColor: type === 'success' ? '#e0f3ff' : '#f5f5f5',
//     color: type === 'success' ? '#0b5e9c' : '#555',
//     border: `1px solid ${type === 'success' ? '#0b5e9c' : '#aaa'}`,
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     zIndex: 999,
//     fontWeight: 500,
//     fontSize: '15px',
//     textAlign: 'center',
//     maxWidth: '90%',
//   };

//   return (
//     <div style={alertStyle} onClick={onClose}>
//       {message}
//     </div>
//   );
// };

// const Signup = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [alert, setAlert] = useState({ message: '', type: '' });

//   const showAlert = (message, type = 'info') => {
//     setAlert({ message, type });
//     setTimeout(() => setAlert({ message: '', type: '' }), 3000);
//   };

//   const validateUsername = (name) => /^[A-Za-z]+$/.test(name);
//   const validateEmail = (email) => /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(email);
//   const validatePassword = (pass) => pass.length >= 6;

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     if (!username || !password || !email) {
//       showAlert('Please fill all fields.', 'error');
//       return;
//     }

//     if (!validateUsername(username)) {
//       showAlert('Username must contain only letters.', 'error');
//       return;
//     }

//     if (!validateEmail(email)) {
//       showAlert('Enter a valid email address.', 'error');
//       return;
//     }

//     if (!validatePassword(password)) {
//       showAlert('Password must be at least 6 characters.', 'error');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:5000/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password, email, role: 'student' }),
//       });

//       const data = await res.json();

//       if (res.status === 201) {
//         showAlert('Signup successful!', 'success');
//         setTimeout(() => navigate('/login'), 1500);
//       } else {
//         showAlert(data.message || 'Signup failed.', 'error');
//       }
//     } catch (error) {
//       showAlert('Error connecting to server.', 'error');
//       console.error(error);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <AlertBox message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: '' })} />

//       <div style={styles.title}>🎓 Create Your LearnSetu Account</div>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Signup</h2>
//         <form onSubmit={handleSignup} style={styles.form}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//             required
//           />
//           <button type="submit" style={styles.button}>Signup</button>
//         </form>
//         <p style={styles.text}>
//           Already have an account? <Link to="/login" style={styles.link}>Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     backgroundColor: '#d3d3d3',
//     minHeight: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: 'Segoe UI, sans-serif',
//     padding: '20px',
//   },
//   title: {
//     fontSize: '24px',
//     fontWeight: '600',
//     color: '#222',
//     marginBottom: '20px',
//   },
//   card: {
//     background: 'rgba(255, 255, 255, 0.6)',
//     backdropFilter: 'blur(8px)',
//     WebkitBackdropFilter: 'blur(8px)',
//     padding: '40px',
//     borderRadius: '10px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//     width: '100%',
//     maxWidth: '400px',
//     textAlign: 'center',
//   },
//   heading: {
//     marginBottom: '20px',
//     color: '#333',
//     fontWeight: '600',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   input: {
//     padding: '12px',
//     margin: '10px 0',
//     borderRadius: '6px',
//     border: '1px solid #bbb',
//     fontSize: '15px',
//     backgroundColor: '#f9f9f9',
//     color: '#333',
//   },
//   button: {
//     backgroundColor: '#555',
//     color: '#fff',
//     padding: '12px',
//     border: 'none',
//     borderRadius: '6px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     marginTop: '10px',
//   },
//   text: {
//     marginTop: '15px',
//     color: '#444',
//     fontSize: '14px',
//   },
//   link: {
//     color: '#222',
//     fontWeight: 'bold',
//     textDecoration: 'underline',
//   },
// };

// export default Signup;

