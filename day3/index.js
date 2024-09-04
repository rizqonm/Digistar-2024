const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let users = [];

app.get('/users', (req, res) => {
    const { query } = req;
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    users = users.map(u => (u.id === id ? user : u));
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter(u => u.id !== id);
    res.status(204).end();
});