const express = require("express");
const router = express.Router();
const todos = require("./todos");

// Endpoint starts here
router.get("/", (request, response) => {
  response.status(200).json(todos);
});

router.get("/:id", (request, response) => {
  response
    .status(200)
    .json({ data: todos.find((todo) => todo.id === request.params.id) });
});

router.post("/", (request, response) => {
  todos.push(request.body);
  response.status(201).json({ msg: "Todo created successfully" });
});

router.put("/:id", (request, response) => {
  const todo = todos.find((todo) => todo.id === request.params.id);
  if (todo) {
    const { title, desc, completed } = request.body;
    todo.title = title;
    todo.desc = desc;
    todo.completed = completed;
    response.status(200).json({ msg: "Todo updated sucessfully" });
    return;
  }
  response.status(404).json({ msg: "Todo not found" });
});

router.delete("/:id", (request, response) => {
  const todoIndex = todos.findIndex((todo) => (todo.id = request.params.id));
  if (todoIndex) {
    todos.splice(todoIndex, 1);
    response.status(200).json({ msg: "Todo deleted successfully" });
  }
  response.status(404).json({ msg: "Todo not found" });
});

module.exports = router;
