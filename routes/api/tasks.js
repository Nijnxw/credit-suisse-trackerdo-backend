const express = require('express');
const router = express.Router();

// Load Task model
const Task = require('../../models/Task');
const taskController = require('../../controllers/taskController')

// @route GET api/tasks/test
// @description tests tasks route
// @access Public
router.get('/test', (req, res) => res.send('task route testing!'));

// @route GET api/tasks
// @description Get all tasks
// @access Public
router.get('/', taskController.getAllTasks);

// @route GET api/tasks/ongoing
// @description Get all ongoing tasks
// @access Public
router.get('/ongoing', taskController.getAllOngoingTasks);

// @route GET api/tasks/overdued
// @description Get all overdued tasks
// @access Public
router.get('/overdued', taskController.getAllOverduedTasks);

// @route GET api/tasks/today
// @description Get all tasks due today
// @access Public
router.get('/today', taskController.getTodayTasks);

// @route GET api/tasks/completed
// @description Get all completed tasks
// @access Public
router.get('/completed', taskController.getAllCompletedTasks);

// @route GET api/tasks/:id
// @description Get single task by id
// @access Public
router.get('/:id', taskController.getTaskById);

// @route POST api/tasks
// @description add/save task
// @access Public
router.post('/', taskController.createTask);

// @route POST api/tasks/new
// @description add/save new task
// @access Public
router.post('/new', taskController.createNewTask);

// @route PUT api/tasks/:id
// @description Update task
// @access Public
router.put('/:id', taskController.updateTaskById);

// @route DELETE api/tasks/:id
// @description Delete task by id
// @access Public
router.delete('/:id', taskController.deleteTaskById);

module.exports = router;
