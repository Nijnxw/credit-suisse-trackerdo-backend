const app = require('../../../app')
const db = require('../../../tests/db')

const supertest = require('supertest')
const request = supertest(app)

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())

describe("GET /api/tasks/test ", () => {
  it("should respond with a success text", async () => {
    const response = await request.get("/api/tasks/test");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('task route testing!');
  });
});
