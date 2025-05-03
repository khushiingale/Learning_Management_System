const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const port = 5000;
const userRoutes = require('./routes/users'); 
const noteRoutes = require('./routes/noteRoutes');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const progressRoutes = require("./routes/progress"); // or wherever your file is
app.use(express.json()); // <-- make sure this is at the top to parse JSON body





// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Session setup
app.use(
  session({
    secret: 'secret-key',  // You can change this to a random string
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const studentRoutes = require('./routes/studentRoutes');

const instructorProgressRoutes = require('./routes/instructorRoutes');


app.use('/api', studentRoutes);

app.use('/uploads', express.static('uploads'));



//app.use('/', noteRoutes); 

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/instructor', instructorRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/users', userRoutes); // ✅ Now /api/users/instructors works!
app.use('/api/notes', noteRoutes);
app.use('/api', adminRoutes); // now all routes will start with /api
app.use('/instructor', instructorRoutes);
app.use('/api/progress', require('./routes/progress'));
app.use('/api/instructor', require('./routes/instructorRoutes'));
app.use('/api/instructor', instructorRoutes);






app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
