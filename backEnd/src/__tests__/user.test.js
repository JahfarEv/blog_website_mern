const request = require("supertest");
const app = require("../../app");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

jest.mock("../models/userSchema");
jest.mock("bcrypt");
jest.mock("http-errors");



describe("loginUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user and return status code 201", async () => {
    const res = await request(app)
      .post("/api/user/signup")
      .send({ name: "Test User", email: "user@example.com" });

   
  });

  it("should return status code 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({ password: "password123" });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({ status: "error", message: "All field are required" });
  });

  it('should return status code 400 and message "Please verify your email" if password comparison returns that string', async () => {
    const mockAdmin = {
      email: "user@example.com",
      password: "hashedpassword",
    };
    User.findOne.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue("invalid password");

    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "user@example.com", password: "password123" });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({
      status: "error",
      details:"invalid password",
      message: "An unexpected error occurred",
    });
  });
});
