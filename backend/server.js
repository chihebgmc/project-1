const express = require('express');
const path = require('path');
require('dotenv').config();
require('colors');
const connectDB = require('./config/db');

// Init app
const app = express();
const port = process.env.PORT || 5000;

// Connect to data base
connectDB();

// Middleware
app.use(express.json()); // {"name": "John", "age": 24}
app.use(express.urlencoded({ extended: false })); // name=John&age=24

app.use('/api/users', require('./routes/userRoutes'));

// Use the client app
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// Render client for any path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});

console.log(path.join(__dirname, '/../frontend/build'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
