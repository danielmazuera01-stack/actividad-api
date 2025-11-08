// routes/people.js
const express = require('express');
const router = express.Router();

module.exports = (models) => {
  const { Person } = models;

  router.get('/', async (req, res) => {
    const people = await Person.findAll();
    res.json(people);
  });

  router.get('/:id', async (req, res) => {
    const p = await Person.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Persona no encontrada' });
    res.json(p);
  });

  router.post('/', async (req, res) => {
    const { name, email, role } = req.body;
    if (!name || !email)
      return res.status(400).json({ message: 'name y email son requeridos' });
    try {
      await Person.create({ name, email, role });
      res.json({ message: 'Persona creada' });
    } catch (err) {
      res.status(400).json({ message: 'Error al crear persona', error: err.message });
    }
  });

  router.put('/:id', async (req, res) => {
    const p = await Person.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Persona no encontrada' });
    await p.update(req.body);
    res.json({ message: 'Persona actualizada' });
  });

  router.delete('/:id', async (req, res) => {
    const p = await Person.findByPk(req.params.id);
    if (!p) return res.status(404).json({ message: 'Persona no encontrada' });
    await p.destroy();
    res.json({ message: 'Persona eliminada' });
  });

  return router;
};
