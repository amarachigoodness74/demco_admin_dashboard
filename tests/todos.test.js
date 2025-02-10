const request = require("supertest");
const express = require("express");
const router = require("../routes");

const app = express();
app.use(express.json());
app.use("/todos", router);

describe("Todos API", () => {
  test("GET /todos should return all todos", async () => {
    const response = await request(app).get("/todos");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /todos/:id should return a specific todo", async () => {
    const response = await request(app).get("/todos/1");
    expect(response.status).toBe(200);
  });

  test("POST /todos should create a new todo", async () => {
    const newTodo = {
      id: 6,
      title: "New Todo",
      desc: "This is a new todo",
      completed: false,
    };

    const response = await request(app).post("/todos").send(newTodo);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ msg: "Todo created successfully" });
  });

  test("PUT /todos/:id should update an existing todo", async () => {
    const updatedTodo = {
      title: "Updated Todo",
      desc: "Updated description",
      completed: true,
    };

    const response = await request(app).put("/todos/1").send(updatedTodo);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ msg: "Todo updated sucessfully" });
  });

  test("DELETE /todos/:id should delete a todo", async () => {
    const response = await request(app).delete("/todos/2");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ msg: "Todo deleted successfully" });
  });
});
