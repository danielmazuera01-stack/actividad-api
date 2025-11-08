// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Project, Task, Person } = require('./models');

const app = express();
app.use(bodyParser.json());

// importar las rutas
const projectsRouter = require('./routes/projects')({ Project });
const tasksRouter = require('./routes/tasks')({ Task, Project });
const peopleRouter = require('./routes/people')({ Person });

// asignarlas a sus endpoints
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/people', peopleRouter);

// middleware de error
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// puerto
const PORT = process.env.PORT || 3000;

// sincroniza base de datos y levanta servidor
async function start() {
  await sequelize.sync(); // crea tablas si no existen
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

start();
