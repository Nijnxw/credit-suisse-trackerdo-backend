const mongoose = require('mongoose')
const Task = require('../Task')
const db = require('../../tests/db')

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

const productTask = {
  title: "First",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-06-30T16:00:00Z",
}

describe('Create task from task model', () => {

  it('should create a task instance with the specified fields', async () => {
    // seed
    const createdTask = await Task.create(productTask)

    // test
    const foundTask = await Task.findById(createdTask._id)

    expect(foundTask._id).toEqual(createdTask._id)
    expect(foundTask.title).toEqual(productTask.title)
    expect(foundTask.description).toEqual(productTask.description)
    expect(new Date(foundTask.dueDate)).toEqual(new Date(productTask.dueDate))
    expect(parseInt(foundTask.status)).toEqual(0)
    expect(foundTask.isCompleted).toEqual(false)
  })
  
})

describe('GET task by id', () => {
  it('should retrieve the correct task if id matches', async () => {
    // seed
    const { _id: taskId } = await Task.create(productTask)
    
    //test
    const foundTask = await Task.findById(taskId)

    expect(foundTask._id).toEqual(taskId)
  })

  it('should return null if no task is found', async () => {
    await expect(Task.findById(mongoose.Types.ObjectId()))
      .resolves
      .toBeNull()
  })
})
