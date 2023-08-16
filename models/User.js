const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    validate(value) {
      if (value <= 0) {
        throw new Error('age must be bigger than 0');
      }
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = {
  User,
};
