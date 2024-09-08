const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

// Proteksi rute dengan JWT middleware
router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.put('/:id', authMiddleware, todoController.updateTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);
router.patch('/:id/toggle', authMiddleware, todoController.toggleTodo);

module.exports = router;