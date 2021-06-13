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

const getTaskById = async (taskId) => {
  try {
    const foundTask = await Task.findById(taskId)
    if (!foundTask) throw new Error('No task found')
    return foundTask
  } catch (err) {
    throw err
  }
}

const createNewTask = async ({ title, description, dueDate }) => {
  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
    })
    await newTask.save()

    return {
      taskId: newTask._id
    }
  } catch (err) {
    throw err
  }
}

const updateTaskById = async (taskId, updates) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates)
    return { taskId: updatedTask._id }
  } catch (err) {
    throw err
  }
}

const deleteTaskById = async (taskId) => {
  try {
    const foundTask = await Task.findByIdAndRemove(taskId)
    if (!foundTask) throw new Error('No task found')
    return { taskId: foundTask._id }
  } catch (err) {
    throw err
  }
}

exports.getAllTasks = getAllTasks
exports.getAllOngoingTasks = getAllOngoingTasks
exports.getAllOverduedTasks = getAllOverduedTasks
exports.getTodayTasks = getTodayTasks
exports.getAllCompletedTasks = getAllCompletedTasks
exports.getTaskById = getTaskById
exports.createNewTask = createNewTask
exports.updateTaskById = updateTaskById
exports.deleteTaskById = deleteTaskById
