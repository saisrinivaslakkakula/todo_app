const express = require('express')
const router = express.Router()
const {getAllTodos, addTodo, updateTodoByID, deleteTodoByID, getTodoByDate, findToDoByID} = require('../controllers/todo')

router.route("/todo").get(getAllTodos).post(addTodo)
router.route("/todo/:id").put(updateTodoByID).delete(deleteTodoByID)
router.route("/todo/:date").get(getTodoByDate)
router.route("/todo/id/:id").get(findToDoByID)
module.exports = router;