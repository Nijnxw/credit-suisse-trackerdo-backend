require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// routes
const tasks = require('./routes/api/tasks');
const progress = require('./routes/api/progress');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/tasks', tasks);
app.use('/api/progress', progress);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
