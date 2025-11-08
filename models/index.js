
const { Sequelize } = require('sequelize');
const path = require('path');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'db.sqlite'),
  logging: false
});


const Project = require('./project')(sequelize);
const Task = require('./task')(sequelize);
const Person = require('./person')(sequelize);


Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });


module.exports = { sequelize, Project, Task, Person };
