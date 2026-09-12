require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pinoLogger = require('./logger');

const connectToDatabase = require('./db');

const giftRoutes = require('./routes/giftRoutes');
const searchRoutes = require('./routes/searchRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// connect to db
connectToDatabase().then(() => {
    pinoLogger.info('Connected to DB');
}).catch((e) => console.log('Failed to connect to DB', e));

app.use('/api/gifts', giftRoutes);

// Route serving /api/search
app.use('/api/search', searchRoutes);

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Inside the server");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

module.exports = app;