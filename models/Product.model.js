const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const Product = sequelize.define('product', {
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    validate(value) {
      if (value < 0) {
        throw new Error('price is wrong');
      }
    },
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    validate(value) {
      if (value < 0) {
        throw new Error('price is wrong');
      }
    },
  },
});

module.exports = {
  Product,
};
