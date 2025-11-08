// models/task.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('todo', 'inprogress', 'done'), defaultValue: 'todo' },
    projectId: { type: DataTypes.INTEGER, allowNull: false }
  });
};
