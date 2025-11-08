// models/person.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Person', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING }
  });
};
