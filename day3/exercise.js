const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const todos = [];

const getTodos = (req, res) => {
    res.json(todos);
};

const createTodo = (req, res) => {
    const { description, date } = req.body;
    if (!description || !date) {
        return res.status(400).json({ error: 'Description and date are required' });
    }

    const newTodo = {
        id: Date.now().toString(),
        description,
        date,
        is_checked: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
};

const updateTodo = (req, res) => {
    const { id } = req.params;
    const { description, date } = req.body;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    if (description) todo.description = description;
    if (date) todo.date = date;

    res.json(todo);
};

const deleteTodo = (req, res) => {
    const { id } = req.params;

    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(204).send();
};

const toggleTodo = (req, res) => {
    const { id } = req.params;

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    todo.is_checked = !todo.is_checked;
    res.json(todo);
};

app.get('/todos', getTodos);
app.post('/todos', createTodo);
app.put('/todos/:id', updateTodo);
app.delete('/todos/:id', deleteTodo);
app.patch('/todos/:id/toggle', toggleTodo);

app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});
