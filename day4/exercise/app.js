require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const todoRoutes = require('./routes/todos');

const app = express();

// Middleware
app.use(express.json());

// Koneksi ke MongoDB Atlas
connectDB();

// Rute
app.use('/todos', todoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
