const mongoose = require('mongoose')

const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
  Task.find({})
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(404).json({ notaskfound: 'No Overdued Task found' }))
}

const getAllOngoingTasks = async (req, res) => {
  Task.find({
      status: { $lt: 100 },
      isCompleted: 'false',
    })
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(404).json({ notaskfound: 'No Overdued Task found' }))
}

const getAllOverduedTasks = async (req, res) => {
  Task.find({
      status: { $lt: 100 },
      isCompleted: 'false',
      dueDate: { $lt: new Date() },
    })
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(404).json({ notaskfound: 'No Overdued Task found' }))
}

const getTodayTasks = async (req, res) => {
  Task.find({
      status: { $lt: 100 },
      isCompleted: 'false',
      dueDate: { $eq: new Date() },
    })
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(404).json({ notaskfound: 'No Overdued Task found' }))
}

const getAllCompletedTasks = async (req, res) => {
  Task.find({
      status: { $eq: 100 },
      isCompleted: 'true',
    })
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(404).json({ notaskfound: 'No Overdued Task found' }))
}

const getTaskById = async (req, res) => {
  Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(404).json({ notaskfound: 'No Task found' }));
}

const createTask = async (req, res) => {
  Task.create(req.body)
    .then(task => res.json({ msg: 'Task added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this task' }));
}

const createNewTask = async (req, res) => {
  const { title, description, dueDate } = req.body
  Task.create({ title, description, dueDate })
    .then(task => res.json({ msg: 'Task added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this task' }));
}

const updateTaskById = async (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body)
    .then(task => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
}

const deleteTaskById = async (req, res) => {
  Task.findByIdAndRemove(req.params.id)
    .then(task => res.json({ mgs: 'Task entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a task' }));
}

exports.getAllTasks = getAllTasks
exports.getAllOngoingTasks = getAllOngoingTasks
exports.getAllOverduedTasks = getAllOverduedTasks
exports.getTodayTasks = getTodayTasks
exports.getAllCompletedTasks = getAllCompletedTasks
exports.getTaskById = getTaskById
exports.createTask = createTask
exports.createNewTask = createNewTask
exports.updateTaskById = updateTaskById
exports.deleteTaskById = deleteTaskById
