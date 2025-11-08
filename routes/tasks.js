// routes/tasks.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
  const { Task, Project } = models;

  router.get('/', async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
  });

  router.get('/:id', async (req, res) => {
    const t = await Task.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(t);
  });

  router.post('/', async (req, res) => {
    const { title, description, projectId } = req.body;
    if (!title || !projectId)
      return res.status(400).json({ message: 'title y projectId son requeridos' });
    const project = await Project.findByPk(projectId);
    if (!project)
      return res.status(400).json({ message: 'projectId inválido' });
    await Task.create({ title, description, projectId });
    res.json({ message: 'Tarea creada' });
  });

  router.put('/:id', async (req, res) => {
    const t = await Task.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Tarea no encontrada' });
    await t.update(req.body);
    res.json({ message: 'Tarea actualizada' });
  });

  router.delete('/:id', async (req, res) => {
    const t = await Task.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Tarea no encontrada' });
    await t.destroy();
    res.json({ message: 'Tarea eliminada' });
  });

  return router;
};
