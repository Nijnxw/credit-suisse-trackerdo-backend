const app = require('../app')
const db = require('./db')

const supertest = require('supertest')
const request = supertest(app)

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

describe('GET /', () => {
  it('it should respond with a "Hello world!" text', async () => {
    const response = await request.get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('Hello world!');
  })
})
