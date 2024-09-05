const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Rute untuk operasi CRUD
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.patch('/:id/toggle', todoController.toggleTodo);

module.exports = router;