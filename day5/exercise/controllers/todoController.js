const Todo = require('../models/todo');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.userId });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTodo = async (req, res) => {
    const { description, date } = req.body;
    if (!description || !date) {
        return res.status(400).json({ error: 'Description and date are required' });
    }

    try {
        const newTodo = new Todo({
            description,
            date,
            user: req.user.userId
        });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update, delete, and toggle functions follow the same pattern: check for user

const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { description, date } = req.body;

    try {
        const todo = await Todo.findOne({ _id: id, user: req.user.userId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        if (description) todo.description = description;
        if (date) todo.date = date;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user.userId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const toggleTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findOne({ _id: id, user: req.user.userId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todo.is_checked = !todo.is_checked;
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo, toggleTodo };