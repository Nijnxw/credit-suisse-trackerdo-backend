const Task = require('../models/Task');

const getStatistics = async (req, res, next) => {
  let completed;
  let inProgress;
  let overdued;
  let notStarted;
  
  try {
    const currentDate = new Date()
    completed = await Task.find({ status: { $eq: 100 }, isCompleted: 'true' })
      .then(tasks => tasks.length)
    inProgress = await Task.find({ status: { $gt: 0 }, isCompleted: 'false', dueDate: { $gte: currentDate } })
      .then(tasks => notStarted = tasks.length)
    overdued = await Task.find({ isCompleted: 'false', dueDate: { $lt: currentDate } })
      .then(tasks => notStarted = tasks.length)
    notStarted = await Task.find({ status: { $eq: 0 }, isCompleted: 'false', dueDate: { $gte: currentDate } })
      .then(tasks => tasks.length)
    const statistics = [completed, inProgress, overdued, notStarted]
    res.status(200).json(statistics)
    return
  } catch (err) {
    res.status(404).json({ nostatistics: 'no statistics found'})
    return
  }
}

exports.getStatistics = getStatistics
