require('dotenv').config()
const express = require('express');
const cors = require('cors');

// routes
const tasks = require('./routes/api/tasks');
const progress = require('./routes/api/progress');

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/tasks', tasks);
app.use('/api/progress', progress);

module.exports = app;
