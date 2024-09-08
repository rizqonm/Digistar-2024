require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Koneksi ke MongoDB
connectDB();

// Rute
app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});