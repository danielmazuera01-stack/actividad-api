// routes/projects.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
  const { Project } = models;

  // Obtener todos los proyectos
  router.get('/', async (req, res) => {
    const projects = await Project.findAll();
    res.json(projects);
  });

  // Obtener un proyecto por ID
  router.get('/:id', async (req, res) => {
    const p = await Project.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Proyecto no encontrado' });
    res.json(p);
  });

  // Crear un nuevo proyecto
  router.post('/', async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'El campo name es requerido' });
    await Project.create({ name, description });
    res.json({ message: 'Proyecto creado' });
  });

  // Actualizar un proyecto
  router.put('/:id', async (req, res) => {
    const p = await Project.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Proyecto no encontrado' });
    await p.update(req.body);
    res.json({ message: 'Proyecto actualizado' });
  });

  // Eliminar un proyecto
  router.delete('/:id', async (req, res) => {
    const p = await Project.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Proyecto no encontrado' });
    await p.destroy();
    res.json({ message: 'Proyecto eliminado' });
  });

  return router;
};
