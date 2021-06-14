const mongoose = require('mongoose')
const taskController = require('../taskController')
const Task = require('../../models/Task')
const db = require('../../tests/db')

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

const productTask = {
  title: "First",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-06-30T16:00:00Z",
}

describe('Create new task', () => {
  it('First', async () => {
    const { taskId } = await taskController.createNewTask(productTask)

    // find the task from the db
    const foundTask = await Task.findById(taskId)
    
    expect(foundTask.title).toEqual(productTask.title)
    expect(foundTask.description).toEqual(productTask.description)
    expect(new Date(foundTask.dueDate)).toEqual(new Date(productTask.dueDate))
    expect(parseInt(foundTask.status)).toEqual(0)
    expect(foundTask.isCompleted).toEqual(false)
  })
})

describe('Get task by id', () => {
  it('should retrieve the correct task if id matches', async () => {
    // seed
    const { _id: taskId } = await Task.create(productTask)
    
    //test
    const foundTask = await taskController.getTaskById(taskId)

    expect(foundTask._id).toEqual(taskId)
  })

  it('should throw an error if no task is found', async () => {
    await expect(taskController.getTaskById(mongoose.Types.ObjectId()))
      .rejects
      .toThrow(Error)
  })
})

describe('Update task by id', () => {
  it('should update the correct task if id matches', async () => {
    // seed
    const { _id: taskId } = await Task.create(productTask)

    // test
    const { taskId: updatedTaskId } = await taskController.updateTaskById(taskId, { title: 'Edited' })
    
    // find the task from the db
    const foundTask = await Task.findById(updatedTaskId)

    expect(foundTask._id).toEqual(taskId)
    expect(foundTask.title).toEqual('Edited')
    expect(foundTask.description).toEqual(productTask.description)
    expect(new Date(foundTask.dueDate)).toEqual(new Date(productTask.dueDate))
  })
})

describe('Delete task by id', () => {
  it('should delete the correct task if id matches', async () => {
    // seed
    const { _id: taskId } = await Task.create(productTask)

    await expect(Task.findById(taskId))
      .resolves
      .not
      .toBeNull()
    
    //test
    const { taskId: deleteTaskId } = await taskController.deleteTaskById(taskId)

    await expect(Task.findById(deleteTaskId))
      .resolves
      .toBeNull()
  })

  it('should throw an error if no task is found', async () => {
    await expect(taskController.deleteTaskById(mongoose.Types.ObjectId()))
      .rejects
      .toThrow(Error)
  })
})
