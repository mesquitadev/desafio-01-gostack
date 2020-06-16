const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).send(repositories)
});

app.post("/repositories", (request, response) => {
  try {
    const data = request.body;
    data.id = uuid()
    repositories.push(data);
    return response.status(201).send({
      message: "Repositório cadastrado com sucesso!"
    })
  } catch (e) {
    e.getMessage();
  }
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
