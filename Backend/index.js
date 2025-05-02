const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();


const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_URI
);
const db = mongoose.connection;
db.on("error", (error) => {
    console.error("Connection error:", error);
});
db.once("open", () => {
    console.log("Connected to the database");
});


const auth = require('./routes/auth');
const chart = require('./routes/chart');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'App is working fine 🚀' });
});

app.get("/favicon.ico", (req, res) => {
    // You can send a default favicon or an empty response
    res.status(204).end();
});

app.use('/api/auth', auth);
app.use('/api/chart', chart);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next();
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});