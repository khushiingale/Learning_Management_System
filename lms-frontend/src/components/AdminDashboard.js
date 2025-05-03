import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Dropdown, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  const [instructors, setInstructors] = useState([]);
  const [students, setStudents] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/users/instructors')
      .then((res) => res.json())
      .then((data) => setInstructors(data));

    fetch('http://localhost:5000/api/users/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const toggleStatus = async (id, role) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/admin/user/${id}/toggle`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();

      if (role === 'instructor') {
        setInstructors((prev) =>
          prev.map((inst) =>
            inst.user_id === id ? { ...inst, status: data.status } : inst
          )
        );
      } else {
        setStudents((prev) =>
          prev.map((stud) =>
            stud.user_id === id ? { ...stud, status: data.status } : stud
          )
        );
      }

      alert(data.message || 'Status updated successfully');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update user status');
    }
  };

  const changePassword = async (id, role, password) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/instructor/${id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Server error');
    }
  };

  const cardStyle = {
    backgroundColor: '#1e1f2b',
    color: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
    marginBottom: '25px',
    padding: '20px',
  };

  const sectionTitle = {
    color: '#4bc8ff',
    fontSize: '1.6rem',
    fontWeight: '600',
    marginBottom: '20px',
    borderBottom: '2px solid #4bc8ff',
    paddingBottom: '6px',
  };

  const renderCard = (user, role) => (
    <Card key={user.user_id} style={cardStyle}>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start flex-wrap">
          <div>
            <Card.Title className="fw-semibold fs-5 mb-1">{user.username}</Card.Title>
            <Card.Text className="mb-2" style={{ fontSize: '15px' }}>
              Status:&nbsp;
              <span style={{ fontWeight: 600, color: user.status === 'active' ? '#00ff99' : '#ff4d4f' }}>
                {user.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </Card.Text>
          </div>
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-light" size="sm">
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => toggleStatus(user.user_id, role)}>
                {user.status === 'active' ? 'Deactivate' : 'Activate'}
              </Dropdown.Item>
              {role === 'instructor' && (
                <Dropdown.Item onClick={() => setShowPasswordInput(user.user_id)}>
                  Change Password
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {showPasswordInput === user.user_id && role === 'instructor' && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              changePassword(user.user_id, role, newPassword);
              setNewPassword('');
              setShowPasswordInput(null);
            }}
            className="mt-3"
          >
            <Form.Group controlId={`password-${user.user_id}`}>
              <Form.Control
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-dark text-light"
              />
            </Form.Group>
            <Button type="submit" variant="info" size="sm" className="mt-2">
              Update Password
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );

  return (
    <Container fluid style={{ backgroundColor: '#12131c', minHeight: '100vh', padding: '40px' }}>
      <h2 className="text-center text-light mb-5">Admin Dashboard</h2>
      <Row>
        <Col lg={6} md={12}>
          <h4 style={sectionTitle}>Instructors</h4>
          {instructors.map((inst) => renderCard(inst, 'instructor'))}
        </Col>
        <Col lg={6} md={12}>
          <h4 style={sectionTitle}>Students</h4>
          {students.map((stud) => renderCard(stud, 'student'))}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;











// import React, { useState, useEffect } from 'react';

// const AdminDashboard = () => {
//   const [instructors, setInstructors] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [newPassword, setNewPassword] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:5000/api/users/instructors')
//       .then((res) => res.json())
//       .then((data) => setInstructors(data));

//     fetch('http://localhost:5000/api/users/students')
//       .then((res) => res.json())
//       .then((data) => setStudents(data));
//   }, []);

//   const toggleStatus = async (id, role) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/users/admin/user/${id}/toggle`, {
//         method: 'PUT',
//       });

//       if (!response.ok) throw new Error(`Error: ${response.statusText}`);
//       const data = await response.json();

//       if (role === 'instructor') {
//         setInstructors((prev) =>
//           prev.map((inst) =>
//             inst.user_id === id ? { ...inst, status: data.status } : inst
//           )
//         );
//       } else {
//         setStudents((prev) =>
//           prev.map((stud) =>
//             stud.user_id === id ? { ...stud, status: data.status } : stud
//           )
//         );
//       }

//       alert(data.message);
//     } catch (err) {
//       console.error('Error updating status:', err);
//       alert('Failed to update user status');
//     }
//   };

//   const changePassword = async (id, role, newPassword) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/users/instructor/${id}/password`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ newPassword }),
//       });

//       const data = await response.json();
//       alert(data.message);
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Server error');
//     }
//   };

//   const styles = {
//     container: {
//       fontFamily: 'Poppins, sans-serif',
//       padding: '40px',
//       background: 'linear-gradient(to right, #d9afd9, #97d9e1)',
//       minHeight: '100vh',
//     },
//     title: {
//       textAlign: 'center',
//       fontSize: '2.5rem',
//       color: '#fff',
//       textShadow: '2px 2px #333',
//       marginBottom: '30px',
//     },
//     cardsContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       flexWrap: 'wrap',
//       gap: '30px',
//     },
//     card: {
//       background: 'white',
//       padding: '30px 25px',
//       borderRadius: '20px',
//       width: '420px',
//       boxShadow: '0 15px 25px rgba(0,0,0,0.15)',
//       transition: 'transform 0.3s',
//     },
//     cardHeader: {
//       fontSize: '1.8rem',
//       marginBottom: '15px',
//       color: '#333',
//       borderBottom: '2px solid #eee',
//       paddingBottom: '10px',
//     },
//     userRow: {
//       background: '#f9f9f9',
//       padding: '15px',
//       borderRadius: '10px',
//       marginBottom: '15px',
//       border: '1px solid #eee',
//       transition: '0.3s',
//     },
//     userRowHover: {
//       transform: 'scale(1.02)',
//     },
//     p: {
//       margin: '5px 0',
//     },
//     button: {
//       padding: '10px',
//       marginTop: '8px',
//       width: '100%',
//       border: 'none',
//       borderRadius: '8px',
//       backgroundColor: '#6a11cb',
//       backgroundImage: 'linear-gradient(315deg, #6a11cb 0%, #2575fc 74%)',
//       color: 'white',
//       fontWeight: 'bold',
//       cursor: 'pointer',
//       transition: 'transform 0.2s ease, background 0.3s ease',
//     },
//     dangerButton: {
//       background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
//       marginTop: '10px',
//     },
//     passwordInput: {
//       marginTop: '8px',
//       padding: '10px',
//       width: '100%',
//       borderRadius: '8px',
//       border: '1px solid #ccc',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>🚀 Admin Dashboard</h1>
//       <div style={styles.cardsContainer}>
//         {/* Instructors */}
//         <div style={styles.card}>
//           <h2 style={styles.cardHeader}>👩‍🏫 Instructors</h2>
//           {instructors.map((inst) => (
//             <div key={inst.user_id} style={styles.userRow}>
//               <p style={styles.p}><strong>{inst.username}</strong></p>
//               <p style={styles.p}>Status: {inst.status === 'active' ? '✅ Active' : '❌ Inactive'}</p>
//               <button
//                 style={styles.button}
//                 onClick={() => toggleStatus(inst.user_id, 'instructor')}
//               >
//                 {inst.status === 'active' ? 'Deactivate' : 'Activate'}
//               </button>
//               <input
//                 type="password"
//                 style={styles.passwordInput}
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//               <button
//                 style={{ ...styles.button, ...styles.dangerButton }}
//                 onClick={() => changePassword(inst.user_id, 'instructor', newPassword)}
//               >
//                 Change Password
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Students */}
//         <div style={styles.card}>
//           <h2 style={styles.cardHeader}>🎓 Students</h2>
//           {students.map((stud) => (
//             <div key={stud.user_id} style={styles.userRow}>
//               <p style={styles.p}><strong>{stud.username}</strong></p>
//               <p style={styles.p}>Status: {stud.status === 'active' ? '✅ Active' : '❌ Inactive'}</p>
//               <button
//                 style={styles.button}
//                 onClick={() => toggleStatus(stud.user_id, 'student')}
//               >
//                 {stud.status === 'active' ? 'Deactivate' : 'Activate'}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;




















// // import React, { useState, useEffect } from 'react';

// // const AdminDashboard = () => {
// //   const [instructors, setInstructors] = useState([]);
// //   const [students, setStudents] = useState([]);
// //   const [newPassword, setNewPassword] = useState('');

// //   useEffect(() => {
// //     // Fetch Instructors
// //     fetch('http://localhost:5000/api/users/instructors')
// //       .then((res) => res.json())
// //       .then((data) => setInstructors(data));

// //     // Fetch Students
// //     fetch('http://localhost:5000/api/users/students')
// //       .then((res) => res.json())
// //       .then((data) => setStudents(data));
// //   }, []);

// //   // Toggle user status (active/inactive)
// //   // const toggleStatus = async (id, role) => {
// //   //   try {
// //   //     const response = await fetch(`http://localhost:5000/api/users/admin/user/{id}/toggle`, {
// //   //       method: 'PUT',
// //   //     });                                       

// //   //     const data = await response.json();

// //   //     if (role === 'instructor') {
// //   //       setInstructors((prev) =>
// //   //         prev.map((inst) =>
// //   //           inst.user_id === id ? { ...inst, status: data.status } : inst
// //   //         )
// //   //       );
// //   //     } else {
// //   //       setStudents((prev) =>
// //   //         prev.map((stud) =>
// //   //           stud.user_id === id ? { ...stud, status: data.status } : stud
// //   //         )
// //   //       );
// //   //     }

// //   //     alert(data.message);
// //   //   } catch (err) {
// //   //     console.error(err);
// //   //     alert('Failed to update user status');
// //   //   }
// //   // };

// //   const toggleStatus = async (id, role) => {
// //     try {
// //       // Send PUT request to the API to toggle the user status
// //       const response = await fetch(`http://localhost:5000/api/users/admin/user/${id}/toggle`, {
// //         method: 'PUT',
// //       });
  
// //       // Check if the response is okay (status code 200)
// //       if (!response.ok) {
// //         throw new Error(`Error: ${response.statusText}`);
// //       }
  
// //       // Parse the response JSON
// //       const data = await response.json();
  
// //       console.log('Data from API:', data); // Add a log to see the response
  
// //       // Update the UI with the new status
// //       if (role === 'instructor') {
// //         setInstructors((prev) =>
// //           prev.map((inst) =>
// //             inst.user_id === id ? { ...inst, status: data.status } : inst
// //           )
// //         );
// //       } else {
// //         setStudents((prev) =>
// //           prev.map((stud) =>
// //             stud.user_id === id ? { ...stud, status: data.status } : stud
// //           )
// //         );
// //       }
  
// //       alert(data.message); // Display success message
// //     } catch (err) {
// //       console.error('Error updating status:', err); // Log error to console
// //       alert('Failed to update user status');
// //     }
// //   };
  


// //   // Change user password
// //   const changePassword = async (id, role, newPassword) => {
// //     try {
// //       const response = await fetch(`http://localhost:5000/api/users/instructor/${id}/password`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ newPassword }),
// //       });

// //       const data = await response.json();
// //       alert(data.message);
// //     } catch (error) {
// //       console.error('Error:', error);
// //       alert('Server error');
// //     }
// //   };

// //   const styles = {
// //     container: {
// //       fontFamily: 'Segoe UI, sans-serif',
// //       padding: '40px',
// //       background: 'linear-gradient(to right, #fceabb, #f8b500)',
// //       minHeight: '100vh',
// //     },
// //     title: {
// //       textAlign: 'center',
// //       color: '#333',
// //       marginBottom: '40px',
// //     },
// //     cardsContainer: {
// //       display: 'flex',
// //       justifyContent: 'space-around',
// //       flexWrap: 'wrap',
// //       gap: '20px',
// //     },
// //     card: {
// //       background: '#fff',
// //       padding: '25px',
// //       borderRadius: '15px',
// //       width: '400px',
// //       boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
// //     },
// //     userRow: {
// //       display: 'flex',
// //       flexDirection: 'column',
// //       marginBottom: '15px',
// //       borderBottom: '1px solid #ddd',
// //       paddingBottom: '10px',
// //     },
// //     button: {
// //       marginTop: '5px',
// //       padding: '8px',
// //       border: 'none',
// //       borderRadius: '6px',
// //       cursor: 'pointer',
// //       backgroundColor: '#4caf50',
// //       color: 'white',
// //       transition: 'background 0.3s ease',
// //     },
// //     dangerButton: {
// //       backgroundColor: '#f44336',
// //       marginTop: '5px',
// //     },
// //     p: {
// //       margin: '5px 0',
// //     },
// //     passwordInput: {
// //       margin: '5px 0',
// //       padding: '8px',
// //       borderRadius: '6px',
// //       border: '1px solid #ddd',
// //     },
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h1 style={styles.title}>👑 Admin Dashboard</h1>
// //       <div style={styles.cardsContainer}>
// //         {/* Instructors Card */}
// //         <div style={styles.card}>
// //           <h2>🧑‍🏫 Instructors</h2>
// //           {instructors.map((inst) => (
// //             <div key={inst.user_id} style={styles.userRow}>
// //               <p style={styles.p}><strong>{inst.username}</strong></p>
// //               <p style={styles.p}>Status: {inst.status === 'active' ? '✅ Active' : '❌ Inactive'}</p>
// //               <button
// //                 style={styles.button}
// //                 onClick={() => toggleStatus(inst.user_id, 'instructor')}
// //               >
// //                 {inst.status === 'active' ? 'Deactivate' : 'Activate'}
// //               </button>
// //               <input
// //                 type="password"
// //                 style={styles.passwordInput}
// //                 placeholder="New Password"
// //                 value={newPassword}
// //                 onChange={(e) => setNewPassword(e.target.value)}
// //               />
// //               <button
// //                 style={{ ...styles.button, ...styles.dangerButton }}
// //                 onClick={() => changePassword(inst.user_id, 'instructor', newPassword)}
// //               >
// //                 Change Password
// //               </button>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Students Card */}
// //         <div style={styles.card}>
// //           <h2>🎓 Students</h2>
// //           {students.map((stud) => (
// //             <div key={stud.user_id} style={styles.userRow}>
// //               <p style={styles.p}><strong>{stud.username}</strong></p>
// //               <p style={styles.p}>Status: {stud.status === 'active' ? '✅ Active' : '❌ Inactive'}</p>
// //               <button
// //                 style={styles.button}
// //                 onClick={() => toggleStatus(stud.user_id, 'student')}
// //               >
// //                 {stud.status === 'active' ? 'Deactivate' : 'Activate'}
// //               </button>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
