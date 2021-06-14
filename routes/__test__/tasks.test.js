const app = require('../../app')
const db = require('../../tests/db')
const Task = require('../../models/Task')

const supertest = require('supertest')
const request = supertest(app)

const defaultTask = {
  title: "First",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-06-30T16:00:00Z",
}

const editedTask = {
  title: "Edited First",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-06-30T16:00:00Z",
  status: 20
}

const defaultTasks = [{
  title: "Task 1",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-06-30T16:00:00Z",
}, {
  title: "Task 2",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-07-15T16:00:00Z",
}, {
  title: "Task 3",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  dueDate: "2021-07-15T16:00:00Z",
}]

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

describe("GET /api/tasks/test ", () => {
  it("should respond with a success text", async () => {
    const response = await request.get("/api/tasks/test")
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('task route testing!')
  })
})

describe("GET /api/tasks/ ", () => {
  it("should return an empty array", async () => {
    const response = await request.get("/api/tasks/")
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([])
  })

  it('should return an array of all the default data', async () => {
    // Seed the database
    for (t of defaultTasks) {
      const task = new Task(t)
      await task.save()
    }

    // Sends request...
    const response = await request.get("/api/tasks/")

    // Ensure all fields are saved into database
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toEqual(defaultTasks.length)
    response.body.forEach(task => {
      expect(task.title).toBeTruthy()
      expect(task.description).toBeTruthy()
      expect(task.dueDate).toBeTruthy()
      expect(task.status).toBe(0)
      expect(task.isCompleted).toBe(false)
    })
  })
})

describe("POST /api/tasks/new ", () => {
  it("should save task to database", async () => {
    // Sends request...
    const response = await request.post("/api/tasks/new")
      .send(defaultTask)
      
    // Ensures response contains taskId
    expect(response.statusCode).toBe(200)
    expect(response.body.taskId).toBeTruthy()

    // Searches the task in the database... 
    const task = await Task.findOne({ title: defaultTask.title })

    // Ensure all fields are saved into database
    expect(task.title).toEqual(defaultTask.title)
    expect(task.description).toEqual(defaultTask.description)
    expect(new Date(task.dueDate)).toEqual(new Date(defaultTask.dueDate))
  })
})

describe("PUT /api/tasks/:id ", () => {
  it("should save new title to database", async () => {
    // Seed the database
    const task = new Task(defaultTask)
    await task.save()
    const taskId = task._id

    // Ensure task is in database
    await expect(Task.findById(taskId)).resolves.not.toBeNull()
    expect(parseInt(task.status)).toEqual(0)
    
    // Sends request...
    const response = await request.put(`/api/tasks/${taskId}`)
      .send({ title: editedTask.title })
      
    // Ensures response contains taskId
    expect(response.statusCode).toBe(200)
    expect(response.body.taskId.toString()).toEqual(taskId.toString())

    // Searches the task in the database... 
    const edited = await Task.findById(response.body.taskId)

    // Ensure status field is edited in the database
    expect(edited.title).not.toEqual(defaultTask.title)
    expect(edited.title).toEqual(editedTask.title)
  })

  it("should save new status to database", async () => {
    // Seed the database
    const task = new Task(defaultTask)
    await task.save()
    const taskId = task._id

    // Ensure task is in database
    await expect(Task.findById(taskId)).resolves.not.toBeNull()
    expect(parseInt(task.status)).toEqual(0)
    
    // Sends request...
    const response = await request.put(`/api/tasks/${taskId}`)
      .send({ status: editedTask.status })
      
    // Ensures response contains taskId
    expect(response.statusCode).toBe(200)
    expect(response.body.taskId.toString()).toEqual(taskId.toString())

    // Searches the task in the database... 
    const edited = await Task.findById(response.body.taskId)

    // Ensure status field is edited in the database
    expect(parseInt(edited.status)).not.toEqual(0)
    expect(parseInt(edited.status)).toEqual(editedTask.status)
  })
})

describe("DELETE /api/tasks/:id ", () => {
  it("should remove task from database", async () => {
    // Seed the database
    const { _id: taskId } = await Task.create(defaultTask)

    await expect(Task.findById(taskId)).resolves.not.toBeNull()
    
    // Sends request...
    const response = await request.delete(`/api/tasks/${taskId}`)

    // Ensures response contains taskId
    expect(response.statusCode).toBe(200)
    expect(response.body.taskId.toString()).toEqual(taskId.toString())

    // Searches the task in the database... 
    await expect(Task.findById(taskId)).resolves.toBeNull()
  })
})

