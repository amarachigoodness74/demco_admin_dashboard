const express = require("express");
const router = require("./routes");

const port = 1337;
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome!!!" });
});

app.use("/todos", router);

// App listens to incoming requests here
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
