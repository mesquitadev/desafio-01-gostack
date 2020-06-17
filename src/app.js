const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;
  const repos = { id: uuid(), url, title, techs, likes: 0 };
  repositories.push(repos);
  return response.status(201).json(repos)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const repoIndex = repositories.findIndex( repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(404).json({
      error : 'Project Not Found!'
    })
  }

  repository = {
    url, 
    title,
    techs
  };

  repositories[repoIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const repoIndex = repositories.findIndex( repo => repo.id === id);

  if(repoIndex < 0) {
    return response.status(404).json({
      error : 'Project Not Found!'
    })
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex( repo => repo.id === id)

  if(repoIndex < 0){
    return response.status(404).json({
      error : 'Project Not Found!'
    })
  }

  repository = {
    url,
    title,
    techs,
    likes : +1    
  };

  repositories[repoIndex] = repository;

  return response.json(repository)
});

module.exports = app;
